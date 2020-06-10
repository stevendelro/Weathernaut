import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'

import error from './error/reducer'
import weather from './weather/reducer'
import history from './history/reducer'
import location from './location/reducer'

const combinedReducer = combineReducers({
  weather,
  location,
  history,
  error,
})

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store simply
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]))
  } else {
    //If it's on client side, create a store with a persistability feature
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['weather', 'location', 'history', 'error'], // make sure it does not clash with server keys
      storage,
    }

    const persistedReducer = persistReducer(persistConfig, combinedReducer)
    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    )
    store.__persistor = persistStore(store)
    return store
  }
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore)

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//     // preserve state on client side navigation
//     if (state.weather) nextState.weather = state.weather
//     if (state.location) nextState.location = state.location
//     if (state.history) nextState.history = state.history
//     if (state.error) nextState.error = state.error
//     return nextState
//   } else {
//     return combinedReducer(state, action)
//   }
// }

// const initStore = () => {
//   return createStore(reducer, bindMiddleware([thunkMiddleware]))
// }

// export const wrapper = createWrapper(initStore)

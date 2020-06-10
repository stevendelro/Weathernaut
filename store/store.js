import { createStore, applyMiddleware, combineReducers } from 'redux'
import sessionStorage from 'redux-persist/lib/storage/session'
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
    const storage = sessionStorage

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['weather', 'location', 'history'], // make sure it does not clash with server keys
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

import { errorActionTypes } from './action'

const errorInitialState = {
  isTrue: false,
  mapBoxError: false,
  darkSkyError: false,
  message: '',
}

export default function reducer(state = errorInitialState, action) {
  switch (action.type) {
    case errorActionTypes.ERROR_MAPBOX:
      return {
        ...state,
        error: {
          isTrue: true,
          mapBoxError: true,
          message:
            'Whoops. There was an error retrieving that location! Lets try again.',
        },
      }
    case errorActionTypes.ERROR_DARKSKY:
      return {
        ...state,
        error: {
          isTrue: true,
          darkSkyError: true,
          message:
            'Welp. We ran into a problem getting weather for that location! Lets try again.',
        },
      }
    default:
      return state
  }
}

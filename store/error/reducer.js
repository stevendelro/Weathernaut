import { errorActionTypes } from './action'
import capitalizeFirstLetter from '../../util/capitalizeFirstLetter'

const errorInitialState = {
  mapBoxError: false,
  darkSkyError: false,
  message: {},
}

export default function reducer(state = errorInitialState, action) {
  switch (action.type) {
    case errorActionTypes.ERROR_MAPBOX:
      const userInput = capitalizeFirstLetter(action.payload.userInput)
      return {
        ...state,
        mapBoxError: true,
        message: {
          formal: action.payload.errorMessage,
          casual: `No weather data available for: ${userInput}.`,
        },
      }
    case errorActionTypes.ERROR_CLEARED_MAPBOX:
      return {
        ...state,
        mapBoxError: false,
        userInput: '',
        message: {
          formal: '',
          casual: '',
        },
      }
    case errorActionTypes.ERROR_DARKSKY:
      return {
        ...state,
        darkSkyError: true,
        message: {
          formal: action.payload,
          casual:
            'Whoops. There was an error retrieving the weather for that location! Lets try again.',
        },
      }
    case errorActionTypes.ERROR_CLEARED_DARKSKY:
      return {
        ...state,
        darkSkyError: false,
        userInput: '',
        message: {
          formal: '',
          casual: '',
        },
      }
    default:
      return state
  }
}

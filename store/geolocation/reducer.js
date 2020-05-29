import { deniedGeoActionTypes } from './action'

const deniedGeoInitialState = {
  deniedGeolocation: false,
}

export default function reducer(state = deniedGeoInitialState, action) {
  switch (action.type) {
    case deniedGeoActionTypes.DENIED_GEO:
      return {
        ...state,
        deniedGeolocation: true,
      }
    default:
      return state
  }
}

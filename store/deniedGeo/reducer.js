import { deniedGeoActionTypes } from './action'

const countInitialState = {
  deniedGeolocation: false,
}

export default function reducer(state = countInitialState, action) {
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

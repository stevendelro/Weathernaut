import { setLocationActionTypes } from './action'

const locationInitialState = {
  noLocationData: true,
  deniedGeolocation: undefined,
  placeName: '',
  latitude: '',
  longitude: '',
  timeSearched: '',
  searchedTerm: '',
}

export default function reducer(state = locationInitialState, action) {
  switch (action.type) {
    case setLocationActionTypes.SET_LOCATION:
      return {
        ...state,
        noLocationData: false,
        placeName: action.payload.placeName,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        searchedTerm: action.payload.searchedTerm,
      }
    case setLocationActionTypes.DENIED_GEO:
      return {
        ...state,
        deniedGeolocation: true,
      }
    default:
      return state
  }
}

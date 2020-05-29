import { setLocationActionTypes } from './action'

const locationInitialState = {
  noLocationData: true,
  location: {
    placeName: '',
    latitude: '',
    longitude: '',
    timeSearched: '',
    searchedTerm: '',
  },
}

export default function reducer(state = locationInitialState, action) {
  switch (action.type) {
    case setLocationActionTypes.SET_LOCATION:
      return {
        ...state,
        noLocationData: false,
        location: {
          placeName: action.payload.placeName,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          searchedTerm: action.payload.searchedTerm,
        },
      }
    default:
      return state
  }
}

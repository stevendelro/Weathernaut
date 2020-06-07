import { locationActions } from './action'
import getShortName from '../../util/getShortName'

const locationInitialState = {
  locationLoading: false,
  noLocationData: true,
  deniedGeolocation: false,
  placeName: '',
  latitude: '',
  longitude: '',
  timeSearched: '',
  searchedTerm: '',
  urlSlug: '',
}

export default function reducer(state = locationInitialState, action) {
  switch (action.type) {
    case locationActions.LOCATION_FETCHED:
      return {
        ...state,
        locationLoading: false,
        noLocationData: false,
        placeName: action.payload.placeName,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        searchedTerm: action.payload.searchedTerm,
        urlSlug: getShortName(action.payload.placeName)
      }
    case locationActions.START_LOCATION_FETCH_BY_COORDS:
      return {
        ...state,
        locationLoading: true,
      }
    case locationActions.START_LOCATION_FETCH_BY_PLACENAME:
      return {
        ...state,
        locationLoading: true,
      }
    case locationActions.GEO_DENIED:
      return {
        ...state,
        deniedGeolocation: true,
      }
    default:
      return state
  }
}

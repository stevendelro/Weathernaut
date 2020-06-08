import axios from 'axios'
import { mapBoxError } from '../error/action'

export const locationActions = {
  START_LOCATION_FETCH_BY_COORDS: 'START_LOCATION_FETCH_BY_COORDS',
  START_LOCATION_FETCH_BY_PLACENAME: 'START_LOCATION_FETCH_BY_PLACENAME',
  LOCATION_FETCHED: 'LOCATION_FETCHED',
  GEO_DENIED: 'GEO_DENIED',
}

export const startLocationFetchByCoords = () => dispatch => {
  dispatch({ type: locationActions.START_LOCATION_FETCH_BY_COORDS })
}
export const startLocationFetchByPlaceName = () => dispatch => {
  dispatch({ type: locationActions.START_LOCATION_FETCH_BY_PLACENAME })
}

export const denyGeo = () => dispatch => {
  return dispatch({
    type: locationActions.GEO_DENIED,
  })
}

export const getLocationByCoords = coords => async dispatch => {
  startLocationFetchByCoords()
  const res = await axios
    .get(`/api/mapbox/${coords[0]}/${coords[1]}`)
    .then(({ data }) => {
      dispatch({
        type: locationActions.LOCATION_FETCHED,
        payload: data,
      })
      return data
    })
    .catch(error => mapBoxError(coords, error.message))

  if (res) {
    return res
  }
}

export const getLocationByPlaceName = placeName => async dispatch => {
  startLocationFetchByPlaceName()
  const res = await axios
    .get(`/api/mapbox/${placeName}`)
    .then(({ data }) => {
      dispatch({
        type: locationActions.LOCATION_FETCHED,
        payload: data,
      })
      return data
    })
    .catch(error => mapBoxError(placeName, error.message)(dispatch))

  if (res) {
    return res
  }
}

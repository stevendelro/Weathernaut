import axios from 'axios'

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
    })
    .catch(error => console.log('getLocationByCoords ERROR', error.message))

  if (res) {
    const { place, latitude, longitude } = res.data
    return { place, latitude, longitude }
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
    })
    .catch(error => console.log('getLocationByPlaceName ERROR', error.message))

  if (res) {
    const { place, latitude, longitude } = res.data
    return { place, latitude, longitude }
  }
}

import axios from 'axios'
import useSWR from 'swr'
import fetcher from '../../util/fetcher'
import capitalizeFirstLetter from '../../util/capitalizeFirstLetter'

export const setLocationActionTypes = {
  SET_LOCATION: 'SET_LOCATION',
}

export const getLocationByCoords = coords => dispatch => {
  axios
    .get(`/api/mapbox/${coords[0]}/${coords[1]}`)
    .then(res => {
      dispatch({
        type: setLocationActionTypes.SET_LOCATION,
        payload: res.data,
      })
    })
    .catch(error => console.log('getLocationByCoords ERROR', error.message))
}

export const getLocationByPlaceName = placeName => async dispatch => {
  await axios
    .get(`/api/mapbox/${placeName}`)
    .then(res => {
      dispatch({
        type: setLocationActionTypes.SET_LOCATION,
        payload: {
          placeName: res.placeName,
          latitude: res.latitude,
          longitude: res.longitude,
          searchedTerm: capitalizeFirstLetter(placeName),
        },
      })
      resolve({
        placeName: res.placeName,
        latitude: res.latitude,
        longitude: res.longitude,
        searchedTerm: capitalizeFirstLetter(placeName),
      })
    })
    .catch(error => console.log('getLocationByPlaceName ERROR', error.message))
}

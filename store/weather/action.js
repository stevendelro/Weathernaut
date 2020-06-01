import axios from 'axios'
import { capitalizeFirstLetter } from '../../util/capitalizeFirstLetter'
import { setLocationActionTypes } from '../location/action'

export const weatherActionTypes = {
  GET_WEATHER: 'GET_WEATHER',
}

export const getWeatherByCoords = coords => dispatch => {
  axios
    .get(`/api/darksky/${coords[0]}/${coords[1]}`)
    .then(({ data }) => {
      dispatch({
        type: weatherActionTypes.GET_WEATHER,
        payload: data,
      })
    })
    .catch(error => console.log('ERROR in getWeatherByCoords: ', error.message))
}

export const getWeather = placeName => dispatch => {
  
  // hit mapbox to get coords
  axios
    .get(`/api/mapbox/${placeName}`)
    .then(({ data }) => {
      dispatch({
        type: setLocationActionTypes.SET_LOCATION,
        payload: {
          placeName: data.placeName,
          latitude: data.latitude,
          longitude: data.longitude,
          searchedTerm: capitalizeFirstLetter(placeName),
        },
      })
      // hit darksky with coords to get weather
      axios
        .get(`/api/darksky/${data.latitude}/${data.longitude}`)
        .then(({ data }) => {
          dispatch({
            type: weatherActionTypes.GET_WEATHER,
            payload: data,
          })
        })
        .catch(error =>
          console.log('ERROR in nested getWeather: ', error.message)
        )
    })
    .catch(error => console.log('ERROR in getWeather', error.message))
}

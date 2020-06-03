import axios from 'axios'
import capitalizeFirstLetter from '../../util/capitalizeFirstLetter'
import { getLocationByPlaceName } from '../location/action'
import { logLastCity } from '../history/action'

export const weatherActions = {
  START_WEATHER_FETCH: 'START_WEATHER_FETCH',
  WEATHER_FETCHED: 'WEATHER_FETCHED',
}

export const startWeatherFetch = () => dispatch => {
  dispatch({ type: weatherActions.START_WEATHER_FETCH })
}

export const getWeatherByCoords = coords => async dispatch => {
  startWeatherFetch()
  const res = await axios
    .get(`/api/darksky/${coords[0]}/${coords[1]}`)
    .then(({ data }) => {
      dispatch({
        type: weatherActions.WEATHER_FETCHED,
        payload: data,
      })
    })
    .catch(error => console.log('ERROR in getWeatherByCoords: ', error.message))
  if (res) {
    const { weatherData } = res
    return { weatherData }
  }
}

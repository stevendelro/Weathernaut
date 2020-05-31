import axios from 'axios'
import { getLocationByPlaceName } from '../location/action'
import { capitalizeFirstLetter } from '../../util/capitalizeFirstLetter'
export const weatherActionTypes = {
  GET_WEATHER: 'GET_WEATHER',
}

// export const setWeather = coords => dispatch => {
//   useSWR(`/api/darksky/${coords[0]}/${coords[1]}`, fetcher, {
//     onSuccess: ({ data }) => {
//       dispatch({
//         type: weatherActionTypes.GET_WEATHER,
//         payload: data,
//       })
//     },
//   })
// }

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
  axios
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
      axios
        .get(`/api/darksky/${coords[0]}/${coords[1]}`)
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

import useSWR from 'swr'
import fetcher from '../../util/fetcher'

export const setWeatherActionTypes = {
  SET_WEATHER: 'SET_WEATHER',
}

export const setWeather = coords => dispatch => {
  useSWR(`/api/darksky/${coords[0]}/${coords[1]}`, fetcher, {
    onSuccess: ({ data }) => {
      dispatch({
        type: setWeatherActionTypes.SET_WEATHER,
        payload: data,
      })
    },
  })
}

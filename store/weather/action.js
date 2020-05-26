export const setWeatherActionTypes = {
  SET_WEATHER: 'SET_WEATHER',
}

export const setWeather = weatherData => dispatch => {
  return dispatch({
    type: 'SET_WEATHER',
    payload: weatherData,
  })
}

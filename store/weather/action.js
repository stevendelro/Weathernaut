export const setWeatherActionTypes = {
  SET_WEATHER: 'SET_WEATHER',
}

export const setWeather = initialWeather => dispatch => {
  return dispatch({
    type: 'SET_WEATHER',
    payload: initialWeather,
  })
}

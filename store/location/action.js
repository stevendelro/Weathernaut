export const setLocationActionTypes = {
  SET_LOCATION: 'SET_LOCATION',
}

export const setLocation = locationData => dispatch => {
  return dispatch({
    type: 'SET_LOCATION',
    payload: locationData,
  })
}

export const errorActionTypes = {
  ERROR_MAPBOX: 'ERROR_MAPBOX',
  ERROR_CLEARED_MAPBOX: 'ERROR_CLEARED_MAPBOX',
  ERROR_DARKSKY: 'ERROR_DARKSKY',
  ERROR_CLEARED_DARKSKY: 'ERROR_CLEARED_DARKSKY',
}

export const mapBoxError = (userInput, errorMessage) => dispatch => {
  return dispatch({
    type: errorActionTypes.ERROR_MAPBOX,
    payload: {
      userInput,
      errorMessage
    }
  })
}
export const clearMapBoxError = () => dispatch => {
  return dispatch({
    type: errorActionTypes.ERROR_CLEARED_MAPBOX,
  })
}

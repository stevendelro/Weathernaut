export const errorActionTypes = {
  ERROR_MAPBOX: 'ERROR_MAPBOX',
  ERROR_DARKSKY: 'ERROR_DARKSKY',
}

export const mapboxError = () => dispatch => {
  return dispatch({
    type: 'ERROR_MAPBOX',
  })
}
export const darkskyError = () => dispatch => {
  return dispatch({
    type: 'ERROR_DARKSKY',
  })
}

export const deniedGeoActionTypes = {
  DENIED_GEO: 'DENIED_GEO',
}

export const deniedGeo = rejected => dispatch => {
  return dispatch({
    type: 'DENIED_GEO',
    payload: rejected,
  })
}

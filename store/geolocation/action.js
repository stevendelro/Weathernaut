export const deniedGeoActionTypes = {
  DENIED_GEO: 'DENIED_GEO',
}

const deniedGeo = rejected => dispatch => {
  return dispatch({
    type: 'DENIED_GEO',
    payload: rejected,
  })
}

export default deniedGeo

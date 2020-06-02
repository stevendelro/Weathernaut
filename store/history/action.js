export const historyActionTypes = {
  LOG_LAST_CITY: 'LOG_LAST_CITY',
}

const logLastCity = placeName => dispatch => {
  return dispatch({
    type: historyActionTypes.LOG_LAST_CITY,
    payload: {
      location: placeName,
    },
  })
}

export default logLastCity

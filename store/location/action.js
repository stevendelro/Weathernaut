import useSWR from 'swr'
import fetcher from '../../util/fetcher'

export const setLocationActionTypes = {
  SET_LOCATION: 'SET_LOCATION',
}

export const setLocationByCoords = coords => dispatch => {
  useSWR(`/api/mapbox/${coords[0]}/${coords[1]}`, fetcher, {
    onSuccess: ({ data }) => {
      dispatch({
        type: setLocationActionTypes.SET_LOCATION,
        payload: data,
      })
    },
  })
}

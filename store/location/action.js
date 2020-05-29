import useSWR from 'swr'
import fetcher from '../../util/fetcher'

export const setLocationActionTypes = {
  SET_LOCATION: 'SET_LOCATION',
}

export const setLocationByCoords = coords => dispatch => {
  try {
    useSWR(`/api/mapbox/${coords[0]}/${coords[1]}`, fetcher, {
      onSuccess: ({ data }) => {
        dispatch({
          type: setLocationActionTypes.SET_LOCATION,
          payload: data,
        })
      },
      shouldRetryOnError: false,
    })
  } catch (error) {
    console.error(error)
    console.log(
      "You denied auto-fetching the weather based on your browser's geolocation. Check your browser settings to reset and allow this feature."
    )
  }

}

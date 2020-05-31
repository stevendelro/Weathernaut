import axios from 'axios'
import useSWR from 'swr'
import fetcher from '../../util/fetcher'
import { capitalizeFirstLetter } from '../../util/capitalizeFirstLetter'

export const setLocationActionTypes = {
  SET_LOCATION: 'SET_LOCATION',
}

// export const getLocationByCoords = coords => dispatch => {
//   try {
//     useSWR(`/api/mapbox/${coords[0]}/${coords[1]}`, fetcher, {
//       onSuccess: ({ data }) => {
//         dispatch({
//           type: setLocationActionTypes.SET_LOCATION,
//           payload: data,
//         })
//       },
//       shouldRetryOnError: false,
//     })
//   } catch (error) {
//     console.error(error)
//     console.log(
//       "You denied auto-fetching the weather based on your browser's geolocation. Check your browser settings to reset and allow this feature."
//     )
//   }
// }
// export const getLocationByPlaceName = placeName => dispatch => {
//   try {
//     useSWR(`/api/mapbox/${placeName}`, fetcher, {
//       onSuccess: ({ data }) => {
//         dispatch({
//           type: setLocationActionTypes.SET_LOCATION,
//           payload: {
//             placeName,
//             latitude,
//             longitude,
//             searchedTerm: capitalizeFirstLetter(placeName),
//           },
//         })
//       },
//       shouldRetryOnError: false,
//     })
//   } catch (error) {
//     console.error('Error during MAPBOX fetch: ', error)
//   }
// }

export const getLocationByCoords = coords => dispatch => {
  axios
    .get(`/api/mapbox/${coords[0]}/${coords[1]}`)
    .then(res => {
      dispatch({
        type: setLocationActionTypes.SET_LOCATION,
        payload: res.data,
      })
    })
    .catch(error => console.log('getLocationByCoords ERROR', error.message))
}

export const getLocationByPlaceName = placeName => dispatch => {
  axios
    .get(`/api/mapbox/${placeName}`)
    .then(res => {
      dispatch({
        type: setLocationActionTypes.SET_LOCATION,
        payload: {
          placeName: res.placeName,
          latitude: res.latitude,
          longitude: res.longitude,
          searchedTerm: capitalizeFirstLetter(placeName),
        },
      })
    })
    .catch(error => console.log('getLocationByPlaceName ERROR', error.message))
}

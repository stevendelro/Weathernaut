import moment from 'moment'
import { weatherActionTypes } from './action'

const weatherInitialState = {
  noWeatherData: true,
  loading: false,
  currently: {},
  hourly: {},
  daily: {},
}

export default function reducer(state = weatherInitialState, action) {
  switch (action.type) {
    case weatherActionTypes.GET_WEATHER:
      // Format Timestamp to human legible weekday and day of month
      action.payload.daily.data.forEach(day => {
        day.weekday = moment.unix(day.time).format('ddd')
        day.date = moment.unix(day.time).format('M/D')

        // Format Timestamp to extract sunrise/sunset time.
        day.sunrise = moment.unix(day.sunriseTime).format('h:mm')
        day.sunset = moment.unix(day.sunsetTime).format('h:mm')
      })
      // Format Timestamp to hour of day.
      action.payload.hourly.data.forEach(hour => {
        hour.thisHour = moment.unix(hour.time).format('ha')
        hour.tableHour = moment.unix(hour.time).format('h a')
      })

      return {
        ...state,
        noWeatherData: false,
        weather: {
          ...state.weather,
          loading: false,
          currently: {
            ...action.payload.currently,
            today: moment
              .unix(action.payload.currently.time)
              .format('dddd, MMMM Do'),
          },
          hourly: { ...action.payload.hourly },
          daily: { ...action.payload.daily },
        },
      }

    default:
      return state
  }
}

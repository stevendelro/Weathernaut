import React from 'react'
import Fog from './icons/Fog'
import Rain from './icons/Rain'
import Snow from './icons/Snow'
import Wind from './icons/Wind'
import Sleet from './icons/Sleet'
import Cloudy from './icons/Cloudy'
import ClearDay from './icons/ClearDay'
import ClearNight from './icons/ClearNight'
import PartlyCloudyDay from './icons/PartlyCloudyDay'
import PartlyCloudyNight from './icons/PartlyCloudyNight'

const serveIcon = iconName => {
  switch (iconName) {
    case 'clear-day':
      return <ClearDay />

    case 'clear-night':
      return <ClearNight />

    case 'partly-cloudy-day':
      return <PartlyCloudyDay />

    case 'partly-cloudy-night':
      return <PartlyCloudyNight />

    case 'cloudy':
      return <Cloudy />

    case 'rain':
      return <Rain />

    case 'sleet':
      return <Sleet />

    case 'snow':
      return <Snow />

    case 'wind':
      return <Wind />

    case 'fog':
      return <Fog />

    default:
      return <div></div>
  }
}

export default serveIcon

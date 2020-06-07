import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Title from '../Title'

// AREA CHART COLORS
const gradientFillHigh = '#FFE499'
const lineStrokeHigh= '#FFBC00'

function Next24Chart({ weather }) {
  const [hourlyTemps, setHourlyTemps] = useState([])

  useEffect(() => {
    const next24hours = weather.hourly.data.slice(0, 25)
    next24hours.forEach(hour => {
      setHourlyTemps(prev => [
        ...prev,
        {
          hour: hour.thisHour,
          time: hour.time,
          temp: Number(hour.apparentTemperature.toFixed(0)),
        },
      ])
    })
  }, [weather.hourly.data])

  return (
    <>
      <Title>24 Hours</Title>
      <ResponsiveContainer>
        <AreaChart
          data={hourlyTemps}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='temps' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={gradientFillHigh} stopOpacity={0.8} />
              <stop offset='95%' stopColor={gradientFillHigh} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='hour' />
          <YAxis
            unit='°F'
            type='number'
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='temp'
            stroke={lineStrokeHigh}
            fillOpacity={1}
            fill='url(#temps)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(Next24Chart)

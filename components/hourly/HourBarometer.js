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
const gradientFill = '#83DA70'
const lineStroke = '#3DB125'

function HourBarometer({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const next24Hours = weather.hourly.data.slice(0, 25)
    next24Hours.forEach(hour => {
      setChartData(prev => [
        ...prev,
        {
          time: hour.thisHour,
          pressure: Number((hour.pressure * 0.0295301).toFixed(2)),
        },
      ])
    })
  }, [weather.hourly.data])

  return (
    <>
      <Title>Barometer</Title>
      <ResponsiveContainer minHeight='200px'>
        <AreaChart
          data={chartData}
          syncId='synced'
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <defs>
            <linearGradient id='barometerGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='1%' stopColor={gradientFill} stopOpacity={0.8} />
              <stop offset='99%' stopColor={gradientFill} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis unit='in' domain={['dataMin - 0.25', 'dataMax + 0.25']} />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='pressure'
            stroke={lineStroke}
            fill='url(#barometerGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(HourBarometer)

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
const gradientFill = '#766CC8'
const lineStroke = '#392CA9'

function HourHumidity({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const next24Hours = weather.hourly.data.slice(0, 25)
    next24Hours.forEach(hour => {
      setChartData(prev => [
        ...prev,
        {
          time: hour.thisHour,
          humidity: Number((hour.humidity * 100).toFixed(0)),
        },
      ])
    })
  }, [weather.hourly.data])

  return (
    <>
      <Title>Humidity</Title>
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
            <linearGradient id='humidityGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='1%' stopColor={gradientFill} stopOpacity={0.8} />
              <stop offset='99%' stopColor={gradientFill} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis unit='%' domain={[0, 100]} />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='humidity'
            stroke={lineStroke}
            fill='url(#humidityGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(HourHumidity)

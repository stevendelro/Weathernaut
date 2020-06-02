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

function HourTemp({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    weather.hourly.data.forEach(hour => {
      setChartData(prev => [
        ...prev,
        {
          time: hour.thisHour,
          temp: Number(hour.apparentTemperature.toFixed(0)),
        },
      ])
    })
  }, [weather.hourly.data])

  return (
    <>
      <Title>Temperature</Title>
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
            <linearGradient id='tempGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='1%' stopColor='#FFE499' stopOpacity={0.8} />
              <stop offset='99%' stopColor='#FFE499' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis unit='°F' domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='temp'
            stroke='#FFBC00'
            fill='url(#tempGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(HourTemp)

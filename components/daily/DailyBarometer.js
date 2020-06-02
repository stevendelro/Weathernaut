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

function DailyBarometer({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    weather.daily.data.forEach(day => {
      setChartData(prev => [
        ...prev,
        {
          weekday: day.weekday,
          pressure: Number((day.pressure * 0.0295301).toFixed(2)),
        },
      ])
    })
  }, [weather.daily.data])

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
            <linearGradient
              id='dailyBarometerGradient'
              x1='0'
              y1='0'
              x2='0'
              y2='1'>
              <stop offset='1%' stopColor='#83DA70' stopOpacity={0.8} />
              <stop offset='99%' stopColor='#83DA70' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='weekday' />
          <YAxis unit='in' domain={['dataMin - 0.25', 'dataMax + 0.25']} />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='pressure'
            stroke='#3DB125'
            fill='url(#dailyBarometerGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(DailyBarometer)

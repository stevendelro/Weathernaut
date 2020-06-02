import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
} from 'recharts'
import Title from '../Title'

// BAR CHART COLORS
const barFillColor = '#6886c5'

function DailyRain({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    weather.daily.data.forEach(day => {
      setChartData(prev => [
        ...prev,
        {
          weekday: day.weekday,
          rain: Number(day.precipProbability * 100),
        },
      ])
    })
  }, [weather.daily.data])

  return (
    <>
      <Title>Chance of Rain</Title>
      <ResponsiveContainer minHeight='200px'>
        <BarChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <XAxis dataKey='weekday' />
          <YAxis unit='%' domain={['dataMin', 100]} />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar
            dataKey='rain'
            name='High'
            fill={barFillColor}
            unit='%'
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(DailyRain)

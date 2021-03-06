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

function HourRain({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const next24Hours = weather.hourly.data.slice(0, 25)
    next24Hours.forEach(hour => {
      setChartData(prev => [
        ...prev,
        {
          time: hour.thisHour,
          rain: Number(hour.precipProbability * 100),
        },
      ])
    })
  }, [weather.hourly.data])

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
          <XAxis dataKey='time' />
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
export default connect(mapStateToProps, null)(HourRain)

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
const barFillColor = '#F3E723'

function HourUV({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const next24Hours = weather.hourly.data.slice(0, 25)
    next24Hours.forEach(hour => {
      setChartData(prev => [
        ...prev,
        {
          time: hour.thisHour,
          uv: Number(hour.uvIndex),
        },
      ])
    })
  }, [weather.hourly.data])

  return (
    <>
      <Title>UV Index</Title>
      <ResponsiveContainer minHeight='200px'>
        <BarChart
          data={chartData}
          syncId='synced'
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <XAxis dataKey='time' />
          <YAxis tickSize={1} unit='/10' domain={[0, 10]} />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar dataKey='uv' name='High' fill={barFillColor} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(HourUV)

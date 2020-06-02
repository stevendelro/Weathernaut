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
const gradientFillLow = '#bbe1fa'
const lineStrokeLow= '#3282b8'

function DailyTemps({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    weather.daily.data.forEach(day => {
      setChartData(prev => [
        ...prev,
        {
          weekday: day.weekday,
          High: Number(day.apparentTemperatureHigh.toFixed(0)),
          Low: Number(day.apparentTemperatureLow.toFixed(0)),
        },
      ])
    })
  }, [weather.daily.data])

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
            <linearGradient id='dailyHighGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='1%' stopColor={gradientFillHigh} stopOpacity={0.8} />
              <stop offset='99%' stopColor={gradientFillHigh} stopOpacity={0} />
            </linearGradient>
            <linearGradient id='dailyLowGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='1%' stopColor={gradientFillLow} stopOpacity={0.8} />
              <stop offset='99%' stopColor={gradientFillLow} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='weekday' />
          <YAxis unit='°F' domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='High'
            stroke={lineStrokeHigh}
            fill='url(#dailyHighGradient)'
          />
          <Area
            type='monotone'
            dataKey='Low'
            stroke={lineStrokeLow}
            fill='url(#dailyLowGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}
const mapStateToProps = ({ weather }) => ({ weather })
export default connect(mapStateToProps, null)(DailyTemps)

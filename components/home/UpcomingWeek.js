import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import serveIcon from '../../public/icons/index'

function UpcomingWeek({ weather }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    weather.daily.data.forEach(day => {
      setChartData(prev => [
        ...prev,
        {
          weekday: day.weekday,
          date: day.date,
          lo: day.apparentTemperatureLow.toFixed(0),
          hi: day.apparentTemperatureHigh.toFixed(0),
          icon: day.icon,
        },
      ])
    })
  }, [weather.daily.data])

  if (chartData.length === 8) {
    chartData.shift()
  }
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            {chartData.map(day => (
              <TableCell key={uuidv4()} align='center'>
                {day.weekday.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {chartData.map(day => (
              <TableCell key={uuidv4()} align='center'>
                {serveIcon(day.icon)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {chartData.map(day => (
              <TableCell key={uuidv4()} align='center'>
                {day.hi}°F
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {chartData.map(day => (
              <TableCell key={uuidv4()} align='center'>
                {day.lo}°F
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

function mapStateToProps({ weather }) {
  return { weather }
}
export default connect(mapStateToProps, null)(UpcomingWeek)


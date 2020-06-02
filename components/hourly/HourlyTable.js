import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Title from '../Title'
import getCardinalDirection from '../../util/getCardinalDirection'

function HourlyTable({ weather, location }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    weather.hourly.data.forEach(hour => {
      setChartData(prev => [
        ...prev,
        {
          hour: hour.tableHour,
          temp: hour.apparentTemperature.toFixed(0),
          rain: hour.precipProbability.toFixed(0),
          summary: hour.summary,
          uv: hour.uvIndex,
          humidity: (hour.humidity * 100).toFixed(0),
          visibility: `${hour.visibility.toFixed(1)}${
            hour.visibility === 10 ? '+' : ''
          }`,
          pressure: (hour.pressure * 0.0295301).toFixed(2),
          wind: `${getCardinalDirection(
            hour.windBearing
          )}${' '}${hour.windSpeed.toFixed(1)}`,
          windGusts: hour.windGust.toFixed(1),
          cloudCover: `${(hour.cloudCover * 100).toFixed(0)}`,
        },
      ])
    })
  }, [weather.hourly.data])

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'>
          <Title>{location.placeName}</Title>
          Details each hour
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow variant='head'>
                <TableCell size='small' align='left'>
                  Time
                </TableCell>
                <TableCell size='small' align='center'>
                  Weather
                </TableCell>
                <TableCell size='small' align='center'>
                  (°F) Temp
                </TableCell>
                <TableCell size='small' align='center'>
                  (%) Rain
                </TableCell>
                <TableCell size='small' align='center'>
                  UV Index
                </TableCell>
                <TableCell size='small' align='center'>
                  (%) Humidity
                </TableCell>
                <TableCell size='small' align='center'>
                  (mi) Visibility
                </TableCell>
                <TableCell size='small' align='center'>
                  (in) Pressure
                </TableCell>
                <TableCell size='small' align='center'>
                  (mph) Wind
                </TableCell>
                <TableCell size='small' align='center'>
                  (mph) Gusts
                </TableCell>
                <TableCell size='small' align='center'>
                  (%) Clouds
                </TableCell>
              </TableRow>
              {chartData.map(hour => (
                <TableRow hover={true} key={uuidv4()}>
                  <TableCell size='small' padding='none' align='center'>
                    {hour.hour}
                  </TableCell>
                  <TableCell size='small' padding='none'>
                    {hour.summary}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.temp}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.rain}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.uv}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.humidity}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.visibility}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.pressure}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.wind}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.windGusts}
                  </TableCell>
                  <TableCell size='small' align='center'>
                    {hour.cloudCover}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const mapStateToProps = ({ weather, location }) => ({ weather, location })
export default connect(mapStateToProps, null)(HourlyTable)

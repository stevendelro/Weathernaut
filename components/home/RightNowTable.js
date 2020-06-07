import { connect } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer'
import Title from '../Title'
import getCardinalDirection from '../../util/getCardinalDirection'

function RightNowTable({ currently }) {
  const percentProbability = `${currently.precipProbability.toFixed(0)}%`
  const humidity = `${(currently.humidity * 100).toFixed(0)}%`
  const pressure = `${(currently.pressure * 0.0295301).toFixed(2)} in`
  const cardinalDirection = getCardinalDirection(currently.windBearing)
  const windSpeed = `${currently.windSpeed.toFixed(1)} mph`
  const cloudCover = `${(currently.cloudCover * 100).toFixed(0)}% of sky`
  const visibility =
  `${currently.visibility} mi` + `${currently.visibility === 10 ? '+' : ''}`

  return (
    <>
      <Title>Today</Title>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow hover={true}>
              <TableCell size='small'>Rain</TableCell>
              <TableCell align='right' size='small'>
                {percentProbability}
              </TableCell>
            </TableRow>

            <TableRow hover={true}>
              <TableCell size='small'>Humidity</TableCell>
              <TableCell align='right' size='small'>
                {humidity}
              </TableCell>
            </TableRow>

            <TableRow hover={true}>
              <TableCell size='small'>Visibility</TableCell>
              <TableCell align='right' size='small'>
                {visibility}
              </TableCell>
            </TableRow>

            <TableRow hover={true}>
              <TableCell size='small'>Pressure</TableCell>
              <TableCell align='right' size='small'>
                {pressure}
              </TableCell>
            </TableRow>

            <TableRow hover={true}>
              <TableCell size='small'>Wind</TableCell>
              <TableCell align='right' size='small'>
                {`${cardinalDirection} ${windSpeed}`}
              </TableCell>
            </TableRow>

            <TableRow hover={true}>
              <TableCell size='small'>Cloud Coverage</TableCell>
              <TableCell align='right' size='small'>
                {cloudCover}
              </TableCell>
            </TableRow>
            <TableRow hover={true}>
              <TableCell size='small'>UV Index</TableCell>
              <TableCell align='right' size='small'>
                {currently.uvIndex}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const mapStateToProps = ({ weather }) => {
  const { currently } = weather
  return { currently }
}
export default connect(mapStateToProps, null)(RightNowTable)

import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import ReactMapGL, { Marker } from 'react-map-gl'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Title from '../Title'

function MyMap({ location, weather }) {
  const [key, setKey] = useState(undefined)

  useEffect(() => {
    const res = axios.get(`/api/map/${key}`).then(res => setKey(res.data.key))
  }, [])

  if (!location.latitude || !location.longitude || !key) {
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
            {weather.daily.summary}
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Map is currently unavailable.
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
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
          {weather.daily.summary}
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ReactMapGL
          latitude={location.latitude}
          longitude={location.longitude}
          zoom={10}
          width='100%'
          height={400}
          mapStyle='mapbox://styles/mapbox/outdoors-v11'
          mapboxApiAccessToken={key}>
          <Marker latitude={location.latitude} longitude={location.longitude}>
            <span role='img' aria-label='pin'>
              📍
            </span>
          </Marker>
        </ReactMapGL>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const mapStateToProps = ({ location, weather }) => ({ location, weather })
export default connect(mapStateToProps, null)(MyMap)

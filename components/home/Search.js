import { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import snackBar from '../snackBar'

import {
  startLocationFetchByPlaceName,
  getLocationByPlaceName,
} from '../../store/location/action'
import {
  startWeatherFetch,
  getWeatherByCoords,
} from '../../store/weather/action'
import { clearMapBoxError } from '../../store/error/action'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

function SearchPage(props) {
  const [userInput, setUserInput] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  const [displaySnackBar, setDisplaySnackBar] = useState(false)
  const [err, setErr ] = useState('')
  const classes = useStyles()
  const {
    // Action Creators
    startLocationFetchByPlaceName,
    getLocationByPlaceName,
    startWeatherFetch,
    getWeatherByCoords,
    clearMapBoxError,
    // State
    error,
    urlSlug,
    latitude,
    longitude,
    noWeatherData,
    weatherLoading,
  } = props

  const submitHandler = async event => {
    event.preventDefault()
    setShowSpinner(true)
    startLocationFetchByPlaceName()
    const response = await getLocationByPlaceName(userInput)
    setUserInput('')
  }

  useEffect(() => {
    if (latitude && longitude) {
      startWeatherFetch()
      getWeatherByCoords([latitude, longitude])
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (error.mapBoxError) {
      setShowSpinner(false)
      setErr(error.message.casual)
      setDisplaySnackBar(true)
    }

    if (weatherLoading) {
      setShowSpinner(true)
    }

    if (!noWeatherData) {
      Router.push('/[location]/home', `/${urlSlug}/home`)
    }
  }, [error, noWeatherData, weatherLoading])

  const handleSnackBarClose = () => {
    setDisplaySnackBar(false)
    clearMapBoxError()
  }

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}>
        {showSpinner ? (
          <Grid item>
            <CircularProgress
              color='secondary'
              style={{ height: '100px', width: '100px' }}
              justify='center'
            />
          </Grid>
        ) : (
          <Grid item xs={12} md={8} lg={6}>
            <form onSubmit={submitHandler}>
              <FormControl
                fullWidth
                className={classes.margin}
                variant='outlined'>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  startAdornment={
                    <InputAdornment position='start'>
                      <SearchIcon color='disabled' />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          </Grid>
        )}
        {snackBar(displaySnackBar, handleSnackBarClose, err, 'warning')}
      </Grid>
    </Container>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    startLocationFetchByPlaceName: bindActionCreators(
      startLocationFetchByPlaceName,
      dispatch
    ),
    getLocationByPlaceName: bindActionCreators(
      getLocationByPlaceName,
      dispatch
    ),
    startWeatherFetch: bindActionCreators(startWeatherFetch, dispatch),
    getWeatherByCoords: bindActionCreators(getWeatherByCoords, dispatch),
    clearMapBoxError: bindActionCreators(clearMapBoxError, dispatch),
  }
}
function mapStateToProps({ location, weather, error }) {
  const { urlSlug, latitude, longitude } = location
  const { noWeatherData, weatherLoading } = weather
  return { urlSlug, latitude, longitude, noWeatherData, error, weatherLoading }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

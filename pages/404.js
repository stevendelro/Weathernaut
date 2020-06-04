import { connect } from 'react-redux'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import { makeStyles } from '@material-ui/core/styles'
import getShortName from '../util/getShortName'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '500px',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}))

function NotFoundPage({ placeName }) {
  const classes = useStyles()

  const goHome = place => event => {
    event.preventDefault()
    place
      ? Router.push(`/home/[location]`, `/home/${getShortName(place)}`)
      : Router.push('/')
  }
  return (
    <Container className={classes.container}>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item>
          <img
            src='/404.png'
            alt='404 - Page Not Found'
            className={classes.image}
          />
        </Grid>
        <Grid item>
          <Button
            as='a'
            color='primary'
            onClick={event => goHome(placeName)(event)}>
            <HomeOutlinedIcon color='disabled' fontSize='large' />
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStateToProps = ({ location }) => ({ location })
export default connect(mapStateToProps, null)(NotFoundPage)

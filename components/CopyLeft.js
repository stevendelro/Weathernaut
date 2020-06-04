import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

function CopyLeft({ weatherLoading, locationLoading }) {
  const [renderedComponent, setRenderedComponent] = useState(null)
  useEffect(() => {
    weatherLoading || locationLoading
      ? setRenderedComponent(<CircularProgress color='secondary' style={{ height: '100px', width: '100px'}} align='center'/>)
      : setRenderedComponent(
          <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyleft © '}
            <a
              color='inherit'
              href='https://github.com/stevendelro'
              style={{ textDecoration: 'none', color: 'grey' }}>
              Steven Del Rosario
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        )
  }, [weatherLoading])

  return renderedComponent
}

const mapStateToProps = ({ weather, location }) => {
  const { weatherLoading } = weather
  const { locationLoading } = location
  return { weatherLoading, locationLoading }
}
export default connect(mapStateToProps, null)(CopyLeft)

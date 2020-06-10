import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useStore } from "react-redux";
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '../components/Layout/AppBar/AppBar'
import Drawer from '../components/Layout/Drawer/Drawer'
import NameStamp from '../components/NameStamp'
import theme from '../styles/theme/theme'
import { wrapper } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'


const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    paddingTop: '84px',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  nameStamp: {
    paddingTop: '1.5rem',
    paddingBottom: '1rem',
  },
}))

function MyApp(props) {
  const dateToday = moment().format('dddd, MMMM Do')
  const { Component, pageProps } = props
  const [openDrawer, setOpenDrawer] = useState(false)
  const [appBarTitle, setAppBarTitle] = useState(dateToday)
  const store = useStore((state) => state);
  const classes = useStyles()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Weathernaut</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <PersistGate
          persistor={store.__persistor}
          loading={<LinearProgress />}>
          <div style={{ display: 'flex ' }}>
            <AppBar
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
              appBarTitle={appBarTitle}
            />
            <Drawer
              setAppBarTitle={setAppBarTitle}
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
            <main className={classes.content}>
              <Container maxWidth='lg'>
                <Component {...pageProps} />
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'>
                  <Grid className={classes.nameStamp} item>
                    <NameStamp />
                  </Grid>
                </Grid>
              </Container>
            </main>
          </div>
        </PersistGate>
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)

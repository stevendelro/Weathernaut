import { useState, useEffect } from 'react'
import Head from 'next/head'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CopyLeft from '../components/CopyLeft'
import AppBar from '../components/Layout/AppBar/AppBar'
import Drawer from '../components/Layout/Drawer/Drawer'
import theme from '../styles/theme/theme'
import { wrapper } from '../store/store'

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    marginTop: '57px',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }
}))

function MyApp(props) {
  const [place, setPlace] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [appBarTitle, setAppBarTitle] = useState('React Weather Dashboard')

  const { Component, pageProps } = props
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
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <div style={{ display: 'flex ' }}>
          <AppBar
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            place={place}
            setPlace={setPlace}
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
              <Box pt={4}>
                <CopyLeft />
              </Box>
            </Container>
          </main>
        </div>
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)

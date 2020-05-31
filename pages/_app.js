import { useState, useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '../components/Layout/AppBar/AppBar'
import Drawer from '../components/Layout/Drawer/Drawer'
import theme from '../styles/theme/theme'
import { wrapper } from '../store/store'

function MyApp(props) {
  const [place, setPlace] = useState('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [displayedPage, setDisplayedPage] = useState('home')
  const [appBarTitle, setAppBarTitle] = useState('React Weather Dashboard')

  const { Component, pageProps } = props
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
            setDisplayedPage={setDisplayedPage}
            setAppBarTitle={setAppBarTitle}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
          <Component {...pageProps} setDisplayedPage={setDisplayedPage}  />
        </div>
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)

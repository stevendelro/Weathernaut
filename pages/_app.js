import { useEffect } from 'react'
import Head from 'next/head'
import App from 'next/app'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '../styles/theme/theme'
import { wrapper } from '../store/store'

function MyApp(props) {
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
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)

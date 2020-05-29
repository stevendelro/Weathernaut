import { useEffect } from 'react'
import Head from 'next/head'
import App from 'next/app'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from '../styles/theme/theme'
import { wrapper } from '../store/store'

class WrappedApp extends App {
  constructor(props) {
    super(props)
  }
  // Remove the server-side injected CSS. This is necessary for Material-UI.
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }
  render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export default wrapper.withRedux(WrappedApp)

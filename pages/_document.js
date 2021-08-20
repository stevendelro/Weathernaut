import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../styles/theme/theme'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="description"
            content="A Next.js weather dashboard built with React, Redux, and Recharts."
          />
          <meta name="title" property="og:title" content="Weathernaut" />
          <meta property="og:type" content="website" />
          <meta
            name="image"
            property="og:image"
            content="https://priontyl.sirv.com/Images/weathernaut.png"
          />
          <meta
            name="description"
            property="og:description"
            content="A Next.js weather dashboard built with React, Redux, and Recharts."
          />
          <meta name="author" content="Steven Del Rosario" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.9.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}

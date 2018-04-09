import * as React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'
import getConfig from 'next/config'


injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

export default class MyDocument extends Document {
  props: any
  static getInitialProps(ctx) {
    const renderPage = ctx.renderPage
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    

    return { ...page, styleTags  }
  }
  render() {
    const { publicRuntimeConfig } = getConfig()
    return (
      <html>
        <Head>
          <title>{'Museum'}</title>
          <meta id='vp' name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
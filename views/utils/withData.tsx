import 'isomorphic-fetch'
import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import ApolloClient from 'apollo-boost'
import { getDataFromTree, ApolloProvider } from 'react-apollo'
import getConfig from 'next/config'

type ClientRepository = {
  apolloClient?: ApolloClient<any>
}
declare global {
  interface Window {
    __CLIENT_REPOSITORY__: ClientRepository
  }
}

if (typeof window !== 'undefined') {
  if (!window.__CLIENT_REPOSITORY__) {
    window.__CLIENT_REPOSITORY__ = {}
  }
}

export function withData(initOptions: any) {
  return (
    Component: React.ComponentType<{url?: any}> & { getInitialProps?: (ctx) => any }
  ) => {
    return class Wrapped extends React.Component<{}, {}> {
      // Create new apollo instance if not exists
      client: ApolloClient<{}>
      public static async getInitialProps(ctx) {
        let props: { [key: string]: any } = {}
        if (typeof Component.getInitialProps === 'function') {
          const childProps = await Component.getInitialProps(ctx)
          props = Object.assign({}, props, childProps)
        }

        if (typeof window === 'undefined') {
          // perform server-side apollo rendering

          /**
           * Resolve init data for apollo
           */
          const { serverRuntimeConfig } = getConfig()
          const client = new ApolloClient({
            uri: `http://localhost:${serverRuntimeConfig.port}/graphql`
          })
          let app = (
            <ThemeProvider theme={{}}>
              <ApolloProvider client={client}>
                <Component {...props} url={{ query: ctx.query }} />
              </ApolloProvider>
            </ThemeProvider>
          )
          try {
            await getDataFromTree(app, {
              router: {
                asPath: ctx.asPath,
                pathname: ctx.pathname,
                query: ctx.query
              }
            })
            props = Object.assign({}, props, {
              apolloData: client.cache.extract()
            })
          } catch (e) {
            console.error(e)
          }
        } else {
        }
        return {
          ...props
        }
      }

      constructor(props) {
        super(props)

        if (typeof window !== 'undefined') {
          // use sigleton repository of create new instance
          if (!window.__CLIENT_REPOSITORY__.apolloClient) {
            window.__CLIENT_REPOSITORY__.apolloClient = new ApolloClient({
              uri: '/graphql',
              clientState: props.apolloData
            })
          }
          this.client = window.__CLIENT_REPOSITORY__.apolloClient
        } else {
          // create new Apollo client when SSR
          const { serverRuntimeConfig } = getConfig()
          const graphqlEndpointURI = `http://localhost:${
            serverRuntimeConfig.port
          }/graphql`
          this.client = new ApolloClient({
            uri: graphqlEndpointURI,
            clientState: props.apolloData
          })
        }
      }

      render() {
        return (
          <ThemeProvider theme={{}}>
            <ApolloProvider client={this.client}>
              <Component {...this.props} />
            </ApolloProvider>
          </ThemeProvider>
        )
      }
    }
  }
}
export default withData

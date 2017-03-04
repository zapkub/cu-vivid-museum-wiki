// @flow
import React from 'react';
import Head from 'next/head';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { combineReducers } from 'redux';

import Header from './components/Header';
import Footer from './components/Footer';

import { initStore } from './store';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql' }),
});
const rootReducer = combineReducers({
  apollo: client.reducer(),
});

export default function withAppLayout(Component, title = 'พิพิธภัณฑ์ เภสัชศาสตร์') {
  class Layout extends React.Component {
    static getInitialProps({ req }) {
      const isServer = !!req;
      const store = initStore(rootReducer, {}, isServer)(client);


      return { initialState: store.getState(), isServer };
    }
    constructor(props: any) {
      super(props);
      this.store = initStore(rootReducer, props.initialState, props.isServer)(client);
    }
    props: PropsType
    store: any;

    render() {
      try {
        return (
          <div id="Vivid-app">
            <Head>
              <title>{title}</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <link rel="stylesheet" type="text/css" href="/static/semantic-ui.css" />
              <link href="/static/fonts/circular/stylesheet.css" rel="stylesheet" />
              <link href="/static/fonts/chula-narak/stylesheet.css" rel="stylesheet" />
              <link href="/static/fonts/supermarket/stylesheet.css" rel="stylesheet" />
              <link href="/static/fonts/superspace/stylesheet.css" rel="stylesheet" />
              <link href="/static/react-image-gallery.css" rel="stylesheet" />
              <link href="/static/fonts/fontawesome/css/font-awesome.min.css" rel="stylesheet" />
            </Head>
            <Header />
            <div className="body-container">
              <div className="content">
                <ApolloProvider store={this.store} client={client}>
                  <Component {...this.props} />
                </ApolloProvider>
              </div>
            </div>
            <Footer />
            <style jsx global>
              {
                       `
                        * {
                            -webkit-font-smoothing: antialiased;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Helvetica Neue,Helvetica, Thonburi, Tahoma, Arial,sans-serif;
                        }
                       .body-container {
                            display: flex;
                            min-height: 100vh;
                            flex-direction: column;
                        }
                        .content {
                            flex: 2 0 auto;
                        }
                        `
                                }
            </style>
          </div>
        );
      } catch (e) {
        return <div> { 'opps'} </div>;
      }
    }
   }

  return Layout;
}
exports.withAppLayout = withAppLayout;

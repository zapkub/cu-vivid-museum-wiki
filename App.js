// @flow
import React from 'react';
import Head from 'next/head';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Message } from 'semantic-ui-react';
import { combineReducers } from 'redux';

import Header from './components/Header';
import Footer from './components/Footer';

import { initStore } from './store';


export default function withAppLayout(Component, title = 'พิพิธภัณฑ์ เภสัชศาสตร์') {
  class Layout extends React.Component {
    static getInitialProps({ req }) {
      const isServer = !!req;
      require('dotenv').config();
      const graphqlEndpoint = process.env.GRAPHQL || 'http://localhost:3000/graphql';
      // const client = new ApolloClient({
      //   networkInterface: createNetworkInterface({ uri: graphqlEndpoint }),
      // });

      // const rootReducer = combineReducers({
      //   apollo: client.reducer(),
      // });
      // const store = initStore(rootReducer, {}, isServer)(client);


      return { initialState: {}, isServer, graphqlEndpoint };
    }
    constructor(props: any) {
      super(props);
      this.state = {
        showMsg: true,
      };
      this.client = new ApolloClient({
        networkInterface: createNetworkInterface({ uri: props.graphqlEndpoint }),
      });
      const rootReducer = combineReducers({
        apollo: this.client.reducer(),
      });
      this.store = initStore(rootReducer, props.initialState, props.isServer)(this.client);
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
              <link href="/lib/react-image-gallery/styles/css/image-gallery-no-icon.css" rel="stylesheet" />
              <link href="/static/fonts/fontawesome/css/font-awesome.min.css" rel="stylesheet" />
            </Head>
            {
              this.state.showMsg ? <Message onDismiss={() => this.setState({ showMsg: false })} style={{ margin: 10 }} info>
                <Message.Header>{'Beta release'}</Message.Header>
                <p>{'We are currently at beta stage.'}</p>
              </Message> : null
            }
            <div className="body-container">
              <Header />
              <div className="content">
                <ApolloProvider store={this.store} client={this.client}>
                  <Component {...this.props} />
                </ApolloProvider>
              </div>
              <Footer />
            </div>
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
                        .ui.checkbox input:checked~.box:after, .ui.checkbox input:checked~label:after { color: white }
                        .ui.checkbox .box:before, .ui.checkbox label:before { background: none; }
                        .ui.checkbox input:checked~.box:before, .ui.checkbox input:checked~label:before { background: none; border: 1px solid white; color: white;}
                        .ui.checkbox .box:hover::before, .ui.checkbox label:hover::before { background: none; border: 1px solid white; }
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

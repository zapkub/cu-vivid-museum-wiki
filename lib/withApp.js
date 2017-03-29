import React from 'react';
import Head from 'next/head';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import Header from '../components/Header';
import Footer from '../components/Footer';

if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', () => {
    console.log('err');
  });
  window.onunhandledrejection = function (event) {
    console.log('err');
  };
}

export default function withAppLayout(title = 'พิพิธภัณฑ์ เภสัชศาสตร์') {
  return (Component) => {
    class Layout extends React.Component {
      static getInitialProps({ req }) {
        const isServer = !!req;
        let graphqlEndpoint;
        if (isServer) {
          graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
        }
        if (!graphqlEndpoint) {
          graphqlEndpoint = '/graphql';
        }
        return { isServer, graphqlEndpoint };
      }
      constructor(props: any) {
        super(props);
        this.state = {
          showMsg: true,
        };
        let graphqlEndpoint = props.graphqlEndpoint;
        if (props.graphqlEndpoint && props.isServer) {
          if (typeof window !== 'undefined') { window.graphqlEndpoint = props.graphqlEndpoint; }
        }

        if (!props.isServer) {
          graphqlEndpoint = window.graphqlEndpoint;
        }
        let option = {};
        if (process.env.GRAPHQL_ENDPOINT) {
          option = {
            networkInterface: createNetworkInterface({ uri: graphqlEndpoint }),
          };
        }

        console.log(`start with graphql endpoint : ${graphqlEndpoint}`);
        this.client = new ApolloClient(option);
        this.printError = this.printError.bind(this);
      }

      printError(event) {
        event.preventDefault();
        console.log(`Reason: ${event.reason}`);
      }
      render() {
        try {
          return (
            <div id="Vivid-app">
              <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="stylesheet" type="text/css" href="/static/semantic-ui.css" />
                <link href="/static/fonts/circular/stylesheet.css" rel="stylesheet" />
                <link href="/static/fonts/chula-narak/stylesheet.css" rel="stylesheet" />
                <link href="/static/fonts/supermarket/stylesheet.css" rel="stylesheet" />
                <link href="/static/fonts/superspace/stylesheet.css" rel="stylesheet" />
                <link href="/lib/react-image-gallery/styles/css/image-gallery-no-icon.css" rel="stylesheet" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
              </Head>
              {/* { this.state.showMsg ? <Message
            onDismiss={() => this.setState({ showMsg: false })}
            style={{ margin: 10 }} info
          >
            <Message.Header>{'Beta release'}</Message.Header>
            <p>{'We are currently at beta stage.'}</p>
          </Message> : null }*/}

              <div className="body-container">
                <Header />
                <div className="content">
                  <ApolloProvider client={this.client}>
                    <Component {...this.props} />
                  </ApolloProvider>
                </div>
                <Footer />
              </div>
              <style jsx global> { `
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
             `}</style>
            </div>
          );
        } catch (e) {
          console.log('err');
          return <div />;
        }
      }
   }

    return Layout;
  };
}

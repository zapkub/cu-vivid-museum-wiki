// @flow
import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import path from 'path';
import Header from '../common/Header';
import Footer from '../common/Footer';

import configureStore from '../../store/configStore';

const client = new ApolloClient({
    // networkInterface: createNetworkInterface(),
});

// export default ({ req, children, title = 'This is the default title' }) =>
type PropsType = {
    initialState(): any;
    isServer: boolean;
    title: string;
    children: any[];
}
export default function connectLayout(Component, title = 'พิพิธภัณฑ์ เภสัชศาสตร์') {
    class Layout extends React.Component {
        static getInitialProps(props) {
            const isServer = !!props.req;
            return Component.getInitialProps ? Component.getInitialProps(props) : {
                isServer,
            };
        }
        constructor(props: PropsType) {
            super(props);
            this.store = configureStore(props.initialState, client, props.isServer);
        }
        props: PropsType
        store: any;

        render() {
            return (
                <div id="Vivid-app">
                    <Head>
                        <title>{title}</title>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <link href="/static/fonts/circular/stylesheet.css" rel="stylesheet" />
                        <link href="/static/fonts/chula-narak/stylesheet.css" rel="stylesheet" />
                        <link href="/static/fonts/supermarket/stylesheet.css" rel="stylesheet" />
                        <link href="/static/fonts/superspace/stylesheet.css" rel="stylesheet" />
                        <link href="/static/fonts/fontawesome/css/font-awesome.min.css" rel="stylesheet" />
                        <style global>
                            {
                                `
                        * {
                            -webkit-font-smoothing: antialiased;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Thonburi, Tahoma, Helvetica Neue,Helvetica,Arial,sans-serif;
                        }
                        `
                            }
                        </style>
                    </Head>
                    <div className="container">
                        <Header />
                        <div className="content">
                            <ApolloProvider store={this.store} client={client}>
                                <Component {...this.props} />
                            </ApolloProvider>
                        </div>
                        
                        <style jsx>
                            {
                                `
                        .container {
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
                    <Footer />
                </div>
            );
        }
    }

    return Layout;
}


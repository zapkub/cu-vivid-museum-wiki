// @flow
import React from 'react';
import Constants from './../../constant';
import Link from 'next/prefetch';

export default class Header extends React.Component {
    props: {
        children: any[],
        logoURL: string,
    }
    render() {
        return (
            <header className="container">
                <Link href="/"><img className="logo" alt="" src={this.props.logoURL || '/../../static/images/logo.png'} /></Link>
                <div className="title">
                    {`${Constants.HEADER.TITLE}`}
                </div>

                <div className="subtitle">
                    {`- ${Constants.HEADER.SUBTITLE}`}
                </div>

                <style jsx>
                    {`
                        .container {
                            height: 60px;
                            padding: 10px 25px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;
                            background: rgba(0,0,0,0.5);
                            color: white;
                            flex:0 0 auto;
                            z-index: 2;
                        }
                        .logo {
                            width: 50px;
                        }
                        .title {
                            font-size: 30px;
                            margin-left: 20px;
                        }
                        .subtitle {
                            margin-top: 3px;
                            font-size: 15px;
                            margin-left: 5px;
                        }
                    `}
                </style>
            </header>
        );
    }
}

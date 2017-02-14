// @flow
import React from 'react';
import Constants from './../../constant';
const { COLOR, STYLE } = Constants;


export default () => (
    <div className="container">
        footer
        <style jsx>
            {
                `
                    .container {
                        background:red;
                    }
                `
            }
            </style>
    </div>
)
/*
export default class Footer extends React.Component {

    props: {

    }
    renderExternalLink() {
        return (
            <div className="external-link-wrap">
                <h2>{'เว็บไซต์ด้านเภสัชกรรม'}</h2>
                <div className="link-list">
                    <a href="#">{'กระทรวงสาธารณสุข'}</a>
                    <a href="#">{'สำนักงานคณะกรรมการอาหารและยา'}</a>
                    <a href="#">{'องค์การเภสัชกรรม'}</a>
                    <a href="#">{'เภสัชกรรมสมาคมแห่งประเทศไทย'}</a>
                    <a href="#">{'สภาเภสัชกรรม'}</a>
                </div>
                <style jsx>
                    {
                        `
                        a {
                            color: #848586;
                        }
                        h2 {
                            font-weight: normal;
                            font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif; 
                        }
                        .link-list {
                            display: flex;
                            flex-direction: column;
                        }
                        `
                    }
                </style>
            </div>
        );
    }
    render() {
        return (
            <div className="footer-container">
                <div className="wrap">
                    <div className="info-wrap" >
                        <img alt="" className="logo" src="/static/images/logo.png" width="40" />
                        <br />
                        {'คณะเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย'}<br />
                        {'254 ถนนพญาไทย เขตปทุมวัน'}<br />
                        {'10330'}
                        <div className="social-wrap">
                            <div className="social-item" >
                                <img alt="" src="/static/icon/feed.svg" />
                            </div>
                            <div className="social-item" >
                                <img alt="" src="/static/icon/facebook.svg" />
                            </div>
                            <div className="social-item" >
                                <img alt="" src="/static/icon/twiiter.svg" />
                            </div>
                        </div>
                    </div>
                    <div className="contact-info-wrap" >
                        <div><img alt="" src="/static/icon/phone.svg" width="10" />{'02-218-8283'}</div>
                        <div><img alt="" src="/static/icon/fax.svg" width="10" />{'02-251-5086'}</div>
                        <div><img alt="" src="/static/icon/email.svg" width="10" />{'pharm_ce@yahoo.com'}</div>
                        <div><img alt="" src="/static/icon/website.svg" width="10" />{'www.pharm-ce-chula.com'}</div>
                    </div>
                    {
                        this.renderExternalLink()
                    }
                </div>
                <div className="bottom-row">
                    <div className="bottom-wrap" >
                        {'Copyright © 2010-2011 Continuing Education Unit. All rights reserved'}
                    </div>
                </div>
                <style jsx>
                    {
                        `
                        .footer-container {
                            background-color: #252627;
                            color: #848586;
                            margin-top: 30px;
                            padding:30px 0 0 0;
                        }
                        .wrap {
                            max-width: 1024px;
                            margin:0 auto;
                            display:flex;
                            flex-direction: row;
                            justify-content: space-between;
                            padding:20px 10px;
                        }
                        @media screen and (max-width: 1024px) {
                            .wrap {
                                justify-content: space-around;
                            }
                        }
                        @media screen and (max-width: 600px) {
                            .wrap {
                                flex-direction: column;
                                align-items: stretch;
                            }
                        }
                        .contact-info-wrap {
                            display:flex;
                            justify-content: center;
                            align-items: flex-start;
                            flex-direction: column;
                        }
                        @media screen and (max-width: 600px) {
                            .contact-info-wrap {
                                align-items: center;
                            }
                        }
                        .logo {
                            padding-bottom:10px;
                        }
                        .contact-info-wrap img {
                            margin-right:5px;
                        }
                        .social-wrap{ 
                            display: flex;
                            flex-direction: row;
                            margin:10px 10px;
                        }
                        .social-item {
                            height:40px;
                            margin: 0px 4px;
                            width: 40px;
                            padding: 10px;
                            border: #848586 solid 1px;
                            box-sizing: border-box;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .social-item img {
                            height:15px;
                        }
                        .bottom-row {
                            background:black;
                            padding:15px;
                        }
                        .bottom-row .bottom-wrap {
                            margin:0 auto;
                            display:flex;
                            flex-direction: row;
                            max-width: 1024px;
                            justify-content: space-between;
                        }
                        @media screen and (max-width: 1024px) {
                            .bottom-row .bottom-wrap {
                                justify-content: space-around;
                            }
                        }
                        @media screen and (max-width: 600px) {
                            .bottom-row .bottom-wrap {
                                flex-direction: column;
                                align-items: stretch;
                            }
                        }
                        `
                    }
                </style>
            </div>
        );
    }
}*/

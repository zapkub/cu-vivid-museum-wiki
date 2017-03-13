// @flow
import React from 'react';
import Link from 'next/link';

export default class Header extends React.Component {
  render() {
    return (
      <header className="container">
        <Link href="/"><img className="logo" alt="" src={this.props.logoURL || '/static/images/logo.png'} /></Link>
        <div className="title-container">
          <div className="title">
            {'Museum Search Engine'}
          </div>

          <div className="subtitle">
            {'ระบบค้นข้อมูลภายในพิพิธภัณฑ์ คณะเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย'}
          </div>
        </div>
        <style jsx>{`
                        .container {
                            height: 80px;
                            padding: 10px 25px;
                            display: flex;
                            position: relative;
                            flex-direction: row;
                            align-items: center;
                            font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;
                            background: rgba(0,0,0,0.5);
                            color: white;
                            flex:0 1 auto;
                            z-index: 2;
                        }
                        .logo {
                            width: 50px;
                            cursor: pointer;
                        }
                        .title-container {
                          display: flex;
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
                         @media screen and (max-width: 670px) {
                          .logo {
                            margin-right: 10px;
                          }
                          .title-container {
                            flex-direction: column;
                          }
                          .container {
                            height: auto;
                            position:relative;
                            padding: 10px 10px;
                            justify-content: flex-start; 
                          }
                          .title {
                            font-size: 22px;
                            margin: 5px 0px;
                          }
                          .subtitle {
                            font-size: 14px;
                          }
                        }
           `}</style>
      </header>
    );
  }
}

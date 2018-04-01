import React from 'react'
import { Icon } from 'semantic-ui-react'
import Link from 'next/link'

export default class Footer extends React.Component {
  render () {
    return (
      <div className='footer-container'>
        <div className='wrap'>
          <div className='info-wrap' >
            <a href='http://www.pharm.chula.ac.th/'><span style={{ fontWeight: 'bold', color: '#e896ab' }}>{'คณะเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย'}</span></a>
            <br />
            {' 254 ถนนพญาไทย เขตปทุมวัน 10330'}
            <div>
              <img alt='' src='/static/icon/phone.svg' width='10' />{' 02-218-8283'}
              <img alt='' src='/static/icon/fax.svg' style={{ marginLeft: 10 }} width='10' />{' 02-251-5086'}
            </div>
          </div>
        </div>
        <div className='bottom-row'>
          <div className='bottom-wrap' >
            <span>{'Copyright © 2017 Continuing Education Unit under the BSD-3 License.' }</span>

            <div className='site-menu'>
              <Link href='https://github.com/zapkub/vivid-museum'><a><Icon name='github' />{'Github'}</a></Link>
              <Link href='/release-log'><a>{ 'Changlog' }</a></Link>
              <Link href='/terms'><a>{ 'Terms of Services' }</a></Link>
              <Link href='/policy'><a>{ 'Privacy Policy' }</a></Link>
            </div>
          </div>
        </div>
        <style jsx>{`
            .info-wrap{
                text-align: left;
                padding: 0 10px;
            }
            .site-menu {
                flex: 1 0 auto;
                display: flex;
                justify-content: flex-end;
            }
            .site-menu a {
                margin:0 5px;
                color: #848586;
            }
            .site-menu a:hover{
                color: white;
            }
            .footer-container {
                background-color: #252627;
                color: #848586;
                margin-top: 30px;
            }
            .wrap {
                max-width: 1024px;
                margin:0 auto;
                display:flex;
                flex-direction: row;
                padding:15px 0px 10px 0px;
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
                align-items: center;
                flex-direction: column;
            }
            @media screen and (max-width: 600px) {
                .contact-info-wrap {
                    align-items: center;
                }
            }
            .logo {
                padding-bottom:0px;
                vertical-align: middle;
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
                padding: 5px 0;
            }
            .bottom-row .bottom-wrap {
                margin:0 auto;
                display:flex;
                font-size:12px;
                flex-direction: row;
                max-width: 1024px;

                padding: 0 10px;
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
        ` }</style>
      </div>
    )
  }
}

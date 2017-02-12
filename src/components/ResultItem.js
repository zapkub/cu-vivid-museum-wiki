// @flow
import Text from 'react-highlight-words';
import Router from 'next/router';
import Image from './common/Image';


type ResultItemProps = {
    _id: string;
    name: string;
    scientificName: string;
    family: string;
    localName: string;
    locationName: string;
    blockNo: string;
    otherName: string;
    imageURL: string;
    slotNo: string;
    cuid: string;
    searchWords: string[];
};

export default (props: ResultItemProps) => (
    <div className="container">
        <div className="wrap">
            <div className="thumbnail">
                <Image source={props.imageURL} />
            </div>
            <div className="detail">
                <div className="detail-wrap">
                    <div style={{ cursor: 'pointer' }} onClick={() => Router.push(`/detail?id=${props._id}`)}>
                        <h2>
                            <Text searchWords={props.searchWords || []} textToHighlight={props.name || props.localName || props.otherName[0] || 'ไม่ระบุ'} />
                        </h2>
                    </div>
                    <div className="field">
                        <span className="name">{`ชื่อวิทยาศาสตร์`}</span>:<span className="value">
                            <Text searchWords={props.searchWords || []} textToHighlight={props.scientificName || 'ไม่ระบุ'} />

                        </span>
                    </div>
                    <div className="field">
                        <span className="name">{`ชื่อวงศ์`}</span>:
                        <span className="value">
                            <Text searchWords={props.searchWords || []} textToHighlight={props.family || 'ไม่ระบุ'} />
                        </span>
                    </div>
                </div>
                <div className="footer">
                    <div>
                        {`พื้นที่จัดเก็บ : `}<span style={{ color: '#e896ab', fontWeight: 'bold' }}>{props.slotNo || props.locationName || 'ไม่ระบุ'}</span>
                    </div>
                    <div>
                        <span>{`เลขรหัส : `}</span> <Text searchWords={props.searchWords || []} textToHighlight={props.cuid || 'ไม่ระบุ'} />
                    </div>
                </div>
            </div>
        </div>
        <style jsx>
            {
                `
                .link {
                  text-decoration: none;
                }
                .container {
                    padding: 3px;
                    box-sizing: border-box;
                    flex: 0 0 50%;
                }
                .wrap {
                    display: flex;
                    background: #F9F9F9;
                    border: 1px solid #EEEEEE;
                    box-sizing: border-box;
                    height: 100%;
                    padding: 10px;
                }
                .thumbnail {
                    height: 130px;
                    padding-right: 10px;
                    display:flex;
                    flex: 0 0 150px;
                    align-self: center;
                }
                .detail {
                    flex:1 1 auto;
                    display: flex;
                    flex-direction: column;

                }
                .detail-wrap {
                    padding-bottom: 20px;
                    border-bottom: 1px #eaeaea solid;
                    flex: 1 0 auto;
                }
                h2 {
                    color: #4d876d;
                    font-weight: normal;
                    font-size: 28px;
                    margin: 10px 0;
                    font-family: supermarketregular, Helvetica Neue,Helvetica,Arial,sans-serif;
                }
                h2:hover {
                    
                }
                .field {
                    display: flex;
                    font-size:12px;
                }
                .field .value{
                    font-style: italic;
                    font-size:12px;
                    margin-left: 5px;
                }
                .field .name {
                    font-size:12px;
                    display: inline-block;
                    flex: 0 0 120px;
                }
                .footer {
                    font-size: 12px;
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                }
                `
            }
        </style>
    </div>
);

// @flow
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import Router from 'next/router';

const CategorySearch = (props: { data: any, id: string, scientificName: string }) => {
    return (
        <div>
            <h3 className="title">{`ค้นหาเพิ่มเติม`}</h3>
            {
                props.data.loading ? 'loading..' :
                    (<div className="wrap">
                        {
                            props.data.queryCategory.filter(item => item._id !== props.id).map(
                                (item, i) => {
                                    return (
                                        <div
                                            onClick={() => Router.push(`/result?text=${props.scientificName}&categories=${item._id}`)}
                                            className="search-button" key={i}>
                                            <span className="category-name">{item.name}</span>
                                        </div>
                                    );
                                },
                            )
                        }
                    </div>)
            }
            <style jsx>
                {
                    `
                        .title {
                            text-align: center;
                        }
                        .wrap {
                            display: flex;
                            flex-direction: row;
                        }
                        .search-button {
                            padding: 40px 30px;
                            cursor: pointer;
                            margin: 5px;
                            flex: 1 0 auto;
                            text-align: center;
                            border: 2px solid #99cee1;
                            color: #7f7e81;
                        }
                        .category-name {
                            border-bottom: 2px solid #7f7e81;
                            padding-bottom: 10px;
                        }
                        .search-button:hover {
                            background: #99cee1;
                            color: white;
                        }
                        .search-button:hover .category-name {
                            border-bottom: 2px solid white;
                        }
                    `
                }
            </style>
        </div>
    );
};

const query = gql`
    query categories {
        queryCategory {
            name
            key
            _id
        }
    }
`;

export default compose(
    graphql(query, {}),
)(CategorySearch);

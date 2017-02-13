// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import connectLayout from './../components/HOC/Layout';
import update from 'immutability-helper';

import Link from 'next/link';
import ResultList from '../components/ResultList';
import Loading from '../components/Loading';
import HeroImage from '../containers/HeroImage';

import { SearchInputText, SearchCategory } from '../containers/Searchbar';

type LandingPropsType = {
    Results: {
        loading: boolean,
        queryLatestPlant: {
            results: any[],
            totalPages: number,
            currentPage: number,
            total: number,
        },
        queryCategory: any,
    },
};

const LandingPage = (props: LandingPropsType) => {
    return (
        <div className="container">
            <HeroImage className="background-wrap">
                <div className="search-wrap">
                    <SearchInputText categories={props.Results.queryCategory || []} />
                    <SearchCategory style={{ marginTop: 15 }} categories={props.Results.queryCategory || []} />
                </div>
            </HeroImage>
            <h2>{'ข้อมูลล่าสุด'}</h2>
            <div>
                {props.Results.loading ? <Loading /> :
                    <ResultList results={props.Results.queryLatestPlant ? props.Results.queryLatestPlant.results : []} />}
            </div>
            <style jsx>
                {`
                .container {
                    
                }
                h2 {
                    text-align: center;
                    font-family: 'supermarketregular', 'Thonburi', 'Tahoma';
                    color: #6B6B6B;
                    font-size: 34px;
                    font-weight: normal;
                } 
                .background-wrap {
                    margin-top: -80px;
                    padding-top: 80px;
                    background: url('./../static/images/landing-image.jpg') center center / cover
                }
                .search-wrap {
                    height: 350px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
           ` }
            </style>
        </div>
    );
};

const query = gql`
    query{
        queryCategory {
            name
            key
            _id
        }
        queryLatestPlant(page: 1) {
            total
            currentPage
            totalPages,
            results {
                _id
                cuid
                name
                localName
                slotNo
                blockNo
                scientificName
                collector_en
                collector_th
                altitude
                family
                locationName
                otherName
                duplicateAmount
                habit
                note
            }
        }
    }
`;

const IndexPage = compose(
    graphql(query, {
        name: 'Results',
        options({ params }) {
            return {

            };
        },
    }),
)(LandingPage);

export default connectLayout(IndexPage);

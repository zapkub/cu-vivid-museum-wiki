// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import connectLayout from './../components/HOC/Layout';
import Landing from './../components/LandingPage';
import update from 'immutability-helper';

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
                cuid
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
)(Landing);

export default connectLayout(IndexPage);

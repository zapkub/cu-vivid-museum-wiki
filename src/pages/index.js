// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import connectLayout from './../components/HOC/Layout';
import Landing from './../components/Landing';


const query = gql`
    query{
        getHerbariums(page: 2) {
            total
            currentPage
            totalPages,
            results {
                cuid
                name
                blockNo
                slotNo
                scientificName
                collector_en
                collector_th
                altitude
                date
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
    }),
    connect(store => store.searchbar),
)(Landing);

export default connectLayout(IndexPage);

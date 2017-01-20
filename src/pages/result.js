// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import connectLayout from './../components/HOC/Layout';
import Landing from './../components/SearchResultPage';
import update from 'immutability-helper';

const query = gql`
    query ($text: String, $categories: [String]) {
        queryCategory {
            name
            key
        }
        searchItem(page: 1, text: $text, categories: $categories) {
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
const mapToStore = ({searchbar}) => ({
	text: searchbar.searchInputValue,
	categories: searchbar.selectedCategory || [],
})
const IndexPage = compose(
    graphql(query, {
        name: 'Results',
        options: (props) => {
        	return {
        		variables: {
        			text: props.text,
        			categories: props.categories,
        		}
        	}
        }
    })
)(Landing);
const withResult = connect(mapToStore)(IndexPage)
export default connectLayout(withResult);




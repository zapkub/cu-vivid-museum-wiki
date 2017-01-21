// @flow
import gql from 'graphql-tag';
import Router from 'next/router';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import connectLayout from './../components/HOC/Layout';
import ResultList from '../components/ResultList';
 import Loading from './../components/Loading';
 import * as SearchActions from './../actions/searchbar';

import { SearchInputText, SearchCategory } from '../containers/Searchbar';

const query = gql`
    query ($text: String, $categories: [String]) {
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


const SearchResult = ({ Results, text }) => (
	<div>
		{
			Results.loading ? <Loading /> :
				<div>
					<div className="result-info-wrap">
						{
							Results.searchItem.results.length > 0 ? <div>{'พบ'}<span className="result-number">{Results.searchItem.total}</span> {'ผลลัพธ์การค้นหา'}</div>
							: 'ไม่พบผลลัพธ์'
						}
					</div>
					<div className="result-wrap">
						<ResultList
							searchWords={[text]} results={Results.searchItem ? Results.searchItem.results : []}
						/>
					</div>
				</div>
		}
		<style jsx>
			{
				`
				.result-number {
						font-weight: bold;
						margin: 0 5px;
						font-size: 24px;
					}
					.result-info-wrap {
						display:flex;
						justify-content: center;
						align-items: center;
					}
					.result-wrap {

					}
			`
			}
		</style>
	</div>
);

const SearchResultList = compose(
	graphql(query, {
		name: 'Results',
		options: (props) => {
			return {
				variables: {
					text: props.text,
					categories: props.categories || [],
				},
			};
		},
	}),
)(SearchResult);


type PropsType = {
	text: string;
	categories: any[];
}

class ResultPage extends React.Component {

	static async getInitialProps({ req, query }) {
		return req
			? { userAgent: req.headers['user-agent'], text: query.text, categories: query.categories.split(',') }
			: { userAgent: navigator.userAgent };
	}
	constructor(props) {
		super(props);
		this.state = {
			text: props.url.query.text,
			categories: props.url.query.categories,
		};
		Router.onRouteChangeComplete = (url: string) => {
			this.setState({
				text: Router.query.text,
				categories: Router.query.categories.split(','),
			});
		};
	}
	props: PropsType;
	render() {
		return (
			<div className="container">
				<div className="search-container">
					<SearchInputText fontSize={16} />
					<SearchCategory
						style={{ marginLeft: 20 }} fontSize={16}
					/>
				</div>
				<SearchResultList text={this.state.text} categories={this.state.categories} />
				<style jsx>
					{
						`
					.container {
						flex: 1 0 auto;
					}
					.search-container {
						background: rgba(50,84,26,0.4);
						margin-top: -80px;
						padding-top: 80px;
						padding-left: 30px;
						display:flex;
						flexDirection: row;
						align-items: center;
						height: 200px;
					}
					
				`
					}
				</style>
			</div>
		);
	}
}

const mapToStore = ({searchbar}) => ({
	text: searchbar.searchInputValue,
});
const mapToDispatch = (dispatch) => ({
	updateSearchState(text, categories) {
	}
})
export default connectLayout(connect(mapToStore, mapToDispatch)(ResultPage));


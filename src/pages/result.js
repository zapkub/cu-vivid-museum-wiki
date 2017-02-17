// @flow
import gql from 'graphql-tag';
import Router from 'next/router';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import connectLayout from './../components/HOC/Layout';
import ResultList from '../components/ResultList';
import HeroImage from '../containers/HeroImage';
import Loading from './../components/Loading';
import * as SearchActions from './../actions/searchbar';
import qs from 'qs';
import { SearchbarComponent } from '../containers/Searchbar';
import { ResultPagination } from '../components/common/Pagination';

const query = gql`
    query ($text: String!, $categories: [String]!, $page: Int!) {
        searchItem(page: $page, text: $text, categories: $categories) {
            total
            currentPage
            totalPages,
            results {
				_id
                name
                cuid
                localName
				displayLocation {
					name
    				label
    				discription
				}
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


const SearchResult = ({ Results, text, url }) => (
	<div>
		{
			Results.loading ? <Loading /> :
				Results.searchItem ? <div>
					{
						url.query.text ? '' : <h3 style={{ textAlign: 'center' }}>{'ผลลัพธ์ล่าสุดในหมวด'}</h3>
					}
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
					<div className="paginate-wrap">
						<ResultPagination currentPage={Results.searchItem.currentPage} totalPages={Results.searchItem.totalPages} onPageChange={({ selected }) => {
							const queryString = url.query;
							queryString.page = selected;
							Router.push(`/result?${qs.stringify(queryString)}`);
						}} />
					</div>
				</div> : null
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
						margin: 20px;
						display:flex;
						justify-content: center;
						align-items: center;
					}
					.result-wrap {

					}
					.paginate-wrap {
						display:flex;
						justify-content: center;
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
					page: props.url.query.page || 1,
					categories: props.categories.filter(item => item.length) || [],
				},
			};
		},
	}),
)(SearchResult);


type PropsType = {
	text: string;
	categories: any[];
	isServer: boolean;
}

class ResultPage extends React.Component {

	static async getInitialProps({ req, query }) {
		const isServer = !!req;
		return req
			? { userAgent: req.headers['user-agent'], text: query.text, categories: query.categories.split(','), isServer }
			: { userAgent: navigator.userAgent, isServer };
	}
	constructor(props) {
		super(props);
		this.state = {
			text: props.url.query.text,
			categories: props.url.query.categories.split(','),
		};
	};

	componentDidMount() {
		if (window) {
			window.scrollTo(0, 0);
		}
		Router.onRouteChangeComplete = (url: string) => {
			if (Router.query.categories) {
				this.setState({
					text: Router.query.text || '',
					categories: Router.query.categories.split(','),
				});
				this.props.clearSelectedCategory();
				this.props.updateSearchState(Router.query.text || '', Router.query.categories.split(','));
			}
			if (window) {
				window.scrollTo(0, 0);
			}
		};

		if (this.props.isServer) {
			this.props.updateSearchState(this.state.text || '', this.state.categories);
		}
	}
	props: PropsType;
	render() {
		return (
			<div className="container">
				<HeroImage className="background-wrap">
					<SearchbarComponent />
				</HeroImage>
				<SearchResultList
					{...this.props} text={this.state.text} categories={this.state.categories || []} />
				<style jsx>
					{
						`
  					.container {
  						flex: 1 0 auto;
  					}
				    `
					}
				</style>
			</div>
		);
	}
}

const mapToStore = ({ searchbar }) => ({
	text: searchbar.searchInputValue,
});
const mapToDispatch = dispatch => ({
	updateSearchState(text, categories: any[]) {
		dispatch(SearchActions.onSearchValueChange(text));
		categories.forEach(category => dispatch(SearchActions.onToggleCategory(category)));
	},
	clearSelectedCategory: () => dispatch(SearchActions.clearSelectedCategory()),
});
export default connectLayout(connect(mapToStore, mapToDispatch)(ResultPage));

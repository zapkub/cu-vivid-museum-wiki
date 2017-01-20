// @flow
import React from 'react';
import ResultList from './ResultList';

import { SearchInputText, SearchCategory } from '../containers/Searchbar';


export default ({text, categories, Results}) => {
	return (
		<div>
			<div className="search-container">
				<SearchInputText fontSize={16} categories={Results.queryCategory || []} />
				<SearchCategory fontSize={16} categories={Results.queryCategory || []} />
			</div>
			<div>
				ผลลัพธ์ : {text}
			</div>
			<div>
				{Results.loading ? 'Loading...' :
					<ResultList searchWords={[text]} results={Results.searchItem ? Results.searchItem.results : []} />}
			</div>
			<style jsx>
			{
				`
					.containe {
						flex: 1 0 auto;
					}
					.search-container {
						display:flex;
						flexDirection: row;
					}
				`
			}
			</style>
		</div>
	);
};

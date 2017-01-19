// @flow
import React from 'react';
import Link from 'next/link';
import ResultList from './ResultList';
import { SearchInputText, SearchCategory } from '../containers/Searchbar';

type LandingPropsType = {
    Results: {
        loading: boolean,
            searchItem: {
                results: any[],
                totalPages: number,
                currentPage: number,
                total: number,
            },
            queryCategory: any,
        },
};

export default (props: LandingPropsType) => {
  return (
    <div className="container">
      <div className="background-wrap">
        <div className="search-wrap">
          <SearchInputText categories={ props.Results.queryCategory || [] } />
          <SearchCategory categories={ props.Results.queryCategory || [] } />
        </div>
      </div>
      <h2>{ 'ข้อมูลล่าสุด' }</h2>
      <div>
        { props.Results.loading ? 'Loading...' :
          <ResultList results={ props.Results.searchItem ? props.Results.searchItem.results : [] } /> }
      </div>
      <Link href="/result"> Result </Link>
      <style jsx>
        { `
                .container {
                    
                }
                h2 {
                    text-align: center;
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
}
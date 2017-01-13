// @flow
import React from 'react';
import SearchDialog from './SearchDialog';
import Link from 'next/link';

export default () => (
    <div className="container">
        <div className="search-wrap" >
            <SearchDialog currentCategoryIndexes={[0]} />
        </div>
        <Link href="/result"> Result </Link>
        <style jsx>
            {
                `
                .container {
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
           `
            }
        </style>
    </div>
);

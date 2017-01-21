// @flow

import ResultItem from './ResultItem';

export default ({ results, searchWords }: { results: [], searchWords: string }) => (
    <div className="container">
        <div className="listWrap">
            {
                results.map(
                    (item, i) =>
                        <ResultItem searchWords={searchWords} {...item} key={i} />,
                )
            }
        </div>
        <style jsx>
            {
                `
                    .container {
                        width: 100%;
                        max-width: 1024px;
                        margin: auto;
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .listWrap {
                        max-width: 1024px;
                        display: flex;
                        flex-wrap: wrap;
                    }
                `
            }
        </style>
    </div>
);

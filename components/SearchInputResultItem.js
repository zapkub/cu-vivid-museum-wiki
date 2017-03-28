import React from 'react';
import HighlightText from 'react-highlight-words';

export default ({ scientificName, familyName, searchText }) => (
  <div className="result-wrap">
    <HighlightText searchWords={searchText} highlightClassName="scientific-name" textToHighlight={scientificName} />
    <HighlightText searchWords={searchText} textToHighlight={familyName || ''} />
    <style jsx>{`
        .result-wrap {
            text-transform: capitalize;
            font-style: italic;
        }
        .scientific-name {
            font-weight: bold;
        }
        .family-name {

        }
    `}</style>
  </div>
);


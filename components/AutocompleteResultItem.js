import React from 'react';
import HighlightText from 'react-highlight-words';

export default ({ title, description, searchText, name }) => (
  <div className="result-wrap">
    <div className="name">
      <HighlightText searchWords={searchText} textToHighlight={name || ''} />
    </div>
    <div className="family-name">
      <HighlightText searchWords={searchText} textToHighlight={description || ''} />
    </div>
    <div className="scientific-name">
      <HighlightText searchWords={searchText} textToHighlight={title} />
    </div>
    <style jsx>{`
        .result-wrap {
            text-transform: capitalize;
            font-style: italic;
        }
        .name{
          color: #548031;
        }
        .scientific-name {
            font-weight: bold;
        }
        .family-name {
            font-size: 11px;
        }
    `}</style>
  </div>
);


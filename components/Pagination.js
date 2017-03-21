// @flow
import React from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from 'semantic-ui-react';

export default ({ totalPages, currentPage, onPageChange }) => (
  <div
    id="react-paginate"
  >
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={10}
      marginPagesDisplayed={5}
      initialPage={currentPage}
      onPageChange={onPageChange}
    />
    <div className="mobile-paginate">
      <Button onClick={() => onPageChange({ selected: currentPage - 1 })} circular icon="chevron left" />
      <div className="page-number">{`Page ${currentPage}`}</div>
      <Button onClick={() => onPageChange({ selected: currentPage + 1 })} circular icon="chevron right" />
    </div>
    <style jsx global>
      {
    `
    #react-paginate {
        text-align: center;
        margin-top: 40px;
    }
     #react-paginate a {
         color:#252627;
     }
     #react-paginate .next, #react-paginate .previous {
         font-weight: bold;
     }
     #react-paginate ul {
      display: inline-block;
      padding-left: 15px;
      padding-right: 15px;
     }

     #react-paginate li {
      display: inline-block;
      margin: 0px 5px;
      opacity: 0.7;
      cursor: pointer;
      
     }
     #react-paginate li:hover{
      opacity: 0.9;
     }
     #react-paginate li {
         font-size: 16px;
     }
     #react-paginate li.selected {
      font-size: 28px;
      font-weight: bold;
      opacity: 1;
     }
     #react-paginate .break a {
      cursor: default;
     }
     .mobile-paginate {
         display: none;
         justify-content: center;
         align-items: center;
     }
     @media screen and (max-width: 670px) {
         #react-paginate ul {
             display:none;
         }
         .page-number {
             margin: 0 10px;
         }
         .mobile-paginate {
            display: flex;
            font-size: 28px;
            font-weight: bold;
            opacity: 1;
         }
     }
    `
   }
    </style>
  </div>
);

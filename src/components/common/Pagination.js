// @flow
import React from 'react';
import ReactPaginate from 'react-paginate';
export const ResultPagination = ({ totalPages, currentPage, onPageChange }) => (
	<div id="react-paginate">
		<ReactPaginate
			pageCount={totalPages}
			pageRangeDisplayed={10}
			marginPagesDisplayed={5}
			initialPage={currentPage}
			onPageChange={onPageChange}

		/>
		<style jsx global>
			{
				`
					#react-paginate ul {
						display: inline-block;
						padding-left: 15px;
						padding-right: 15px;
					}

					#react-paginate li {
						display: inline-block;
						padding: 10px 5px;
						opacity: 0.7;
						cursor: pointer;
						
					}
					#react-paginate li:hover{
						opacity: 0.9;
					}
					#react-paginate li.selected {
						font-size: 28px;
						font-weight: bold;
						opacity: 1;
					}
					#react-paginate .break a {
						cursor: default;
					}
				`
			}
		</style>
	</div>
);
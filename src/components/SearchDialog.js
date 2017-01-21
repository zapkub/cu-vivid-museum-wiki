// @flow
import Constants from './../constant';

const categoryList = Constants.SEARCH.CATEGORY_LIST;

type PropsType = {
    currentCategoryIndexes: number[];
    oneLine: boolean;
    categories: string[];
    fontSize: number;
    searchInputValue: string;
    onCategorySelected(): void;
    onFocus(): void;
    onChange(e: any): void;
    onSubmit(): void
};

export default (props: PropsType) => {
    return (
        <div className="container">
            <div className="input-wrap">
                <input
                    placeholder={Constants.SEARCH.PLACEHOLDER}
                    onFocus={props.onFocus}
                    style={{ fontSize: props.fontSize || 28 }}
                    className="search-input"
                    type="text" defaultValue={props.searchInputValue}
                    onChange={e => {
                        props.onSearchValueChange(e.target.value);
                    }}
                    />
                <button
                    onClick={() => {
                        props.confirmSearch(props.searchInputValue, props.selectedCategory);
                    } } className="search-submit"
                    style={{ fontSize: props.fontSize || 28 }}
                    ><i className="fa fa-search" /></button>
            </div>
            <style jsx>
                {
                    `
                    .container{
                        display:flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .input-wrap {
                        display:flex;
                        align-items: stretch;
                        padding: 3px;
                        border-radius: 2px;
                        background: rgba(0, 0, 0, 0.3);
                    }
                    .search-submit {
                        display:flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        background: #006ba5;
                        border:none;
                        padding: 8px 15px 8px 17px;
                        font-size: 24px;
                    }
                    .search-input {
                        font-size: 24px;
                        min-width: 250px;
                        width: 450px;
                        padding: 7px 25px 6px 25px;
                    }
                    .search-input:focus {
                        outline: none;
                    }
                    @media screen and (max-width: 640px) {
                        .search-input {
                            width: 320px;
                        }
                    }
                `
                }
            </style>
        </div>
    )
        ;
};

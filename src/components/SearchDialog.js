// @flow
import Constants from './../constant';

const categoryList = Constants.SEARCH.CATEGORY_LIST;
type PropsType = {
    currentCategoryIndexes: number[];
    categories: {
        name: string;
        value: string;
    }[];
    value: string;
    onCategorySelected(): void;
    onFocus(): void;
    onChange(e: any): void;
    onSubmit(): void
};

export default (props: PropsType) => (
    <div className="container">
        <div className="input-wrap">
            <input placeholder={Constants.SEARCH.PLACEHOLDER} onFocus={props.onFocus} className="search-input" type="text" value={props.value} onChange={props.onChange} />
            <button className="search-submit"><i className="fa fa-search" /></button>
        </div>
        <div className="category-wrap">
            {
                props.categories.map(
                    (item, i) => (
                        <div
                            onClick={
                                () => {
                                    props.onCategorySelected({
                                        value: i,
                                        selected: !props.currentCategoryIndexes.indexOf(i),
                                    });
                                }
                            }
                            className="category-item"
                            key={i}
                            >
                            <i
                                className={`fa ${!props.currentCategoryIndexes.indexOf(i) ? 'fa-check-square-o' : 'fa-square-o'}`}
                                />
                            {item.name}
                        </div>
                    ),
                )
            }
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
                        border-radius: 3px;
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
                        font-size: 28px;
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
                    .category-wrap {
                        margin-top: 15px;
                        padding: 5px 15px;
                        border-radius: 10px;
                        background: rgba(0, 0, 0, 0.3);
                        display: flex;
                        font-size: 20px;
                        color: white;
                    }
                    .fa {
                        margin-right: 4px;
                    }
                    .category-item {
                        margin-right: 15px;
                    }
                    .category-item:nth-last-child(1) {
                        margin:0;
                    }
                `
            }
        </style>
    </div>
);

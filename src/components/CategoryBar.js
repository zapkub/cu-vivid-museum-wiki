import React from 'react';


export default ({style, onToggleCategory, Results, selectedCategory, fontSize, clearSelectedCategory}) => {
    const categories = [];

    return Results.loading ? null : (
        <div className="category-wrap" style={style}>
            {
                Results.queryCategory.map(
                    (item, i) => (
                        <div
                            style={{ fontSize: fontSize || 20 }}
                            onClick={
                                () => onToggleCategory(item._id)
                            }
                            className="category-item"
                            key={i}
                            >
                            <i
                                className={`fa ${selectedCategory.indexOf(item._id) > -1 ? 'fa-check-square-o' : 'fa-square-o'}`}
                                />
                            {item.name}
                        </div>
                    ),
                )
            }
            {
                selectedCategory ? <div className="select-all" onClick={
                    () => {
                        clearSelectedCategory();
                        if (selectedCategory.length !== Results.queryCategory.length) {
                            Results.queryCategory.forEach(item => onToggleCategory(item._id));
                        }
                    }} >
                    {selectedCategory.length === Results.queryCategory.length ? 'Deselect all' : `select all`}
                </div> : null
            }

            <style jsx>
                {
                    `
                    .select-all {
                        font-size: 14px;
                        cursor: pointer;
                    }
                    .category-wrap {
                        padding: 5px 15px;
                        border-radius: 5px;
                        background: rgba(0, 0, 0, 0.3);
                        display: flex;
                        font-size: 20px;
                        color: white;
                        align-items: center;
                    }
                    .fa {
                        margin-right: 4px;
                    }
                    .category-item {
                        margin-right: 15px;
                        cursor: pointer;
                    }
                    .category-item:nth-last-child(1) {
                        margin:0;
                    }
            	`
                }
            </style>
        </div>);
};

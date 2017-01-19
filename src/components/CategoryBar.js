import React from 'react';


export default ({onToggleCategory, categories, selectedCategory, fontSize}) => (<div className="category-wrap">
    {
        categories.map(
            (item, i) => (
                <div
                    style={{ fontSize: fontSize || 20 }}
                    onClick={
                        onToggleCategory.bind(this, item.key)
                    }
                    className="category-item"
                    key={i}
                    >
                    <i
                        className={`fa ${selectedCategory.indexOf(item.key) > -1 ? 'fa-check-square-o' : 'fa-square-o'}`}
                        />
                    {item.name}
                </div>
            ),
        )
    }
    <style jsx>
        {
            `
                    .category-wrap {
                        margin-top: 15px;
                        padding: 5px 15px;
                        border-radius: 5px;
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
</div>)
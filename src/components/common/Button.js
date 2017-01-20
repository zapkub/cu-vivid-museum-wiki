// @flow


export default (props: { title: string; onClick(): void; }) =>
    (
        <button>
            {props.title}
            <style jsx> 
                {
                    `
                        .button {
                            background: #F9F9F9;
                        }
                    `
                }
            </style>
        </button>
    );

// @flow

type Props = {
    source: string;
    className: string;
}

export default (props: Props) => (
    <div className={`wrap ${props.className || ''}`}>
        {
            props.source ? <img alt="" src={props.source} /> :
                <div className="placeholder">
                    {'ไม่มีรูปภาพ'}
                </div>
        }
        <style jsx>
            {
                `
                    .wrap {
                        display: flex;
                        flex-direction: row;
                        flex: 1 0 auto;
                        align-items: stretch;
                    }
                    .placeholder {
                        pointer-events: none;
                        flex:1 0 100%;
                        background: #ccc;
                        color: #979797;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `
            }
        </style>
    </div>
);

const CheckBox = props => (
    <div className="form-check">
        <input className="form-check-input" type="checkbox" value="test" />
        <label className="form-check-label">{props.text}</label>
    </div>
);

const Card = props => {
    return (
        <div className="card border-dark mt-3" style={{ width: '25rem' }}>
            <h5 className="card-header">{props.data.title}</h5>
            <div className="card-body">
                <div className="card-text">
                    {props.data.cardText.map((text, index) => (
                        <CheckBox text={text} key={index} />
                    ))}
                </div>
                <div className="card-btn mt-2 text-end">
                    <button
                        className="btn btn-outline-danger mx-2"
                        onClick={() => {
                            props.handleDelete(props.data);
                        }}
                    >
                        delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;

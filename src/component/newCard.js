const NewCard = props => {
    return (
        <div className="card text-white bg-success mt-3 text-center" style={{ width: '25rem' }}>
            <h5 className="card-header">ADD NEW CARD</h5>
            <div
                className="card-body p-5 text-center"
                onClick={() => props.handleShowEditNewCard()}
            >
                <h5>Click Here</h5>
            </div>
        </div>
    );
};

export default NewCard;

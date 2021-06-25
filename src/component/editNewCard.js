import React, { useState, useEffect } from 'react';

const EditNewCard = props => {
    const [title, setTitle] = useState('Untitled');

    const [cardText, setCardText] = useState([]);

    const [item, setItem] = useState('unnameItem');

    const handleDelete = delete_item => {
        setCardText(cardText.filter(item => item !== delete_item));
    };

    const handleDataUpdate = (title, cardText) => {
        const data = { title: title, cardText: cardText };
        props.handleUpdate(data);
    };

    const handleAddItem = new_item => {
        setCardText(cardText.concat(new_item));
    };

    useEffect(() => {
        console.log('useEffect run');
    });

    return (
        <div className="card border-dark mt-3" style={{ width: '25rem' }}>
            <input
                className="card-header form-control fs-5"
                type="text"
                defaultValue="Untitled"
                onChange={e => setTitle(e.target.value)}
            />

            <div className="card-body position-relative">
                <input
                    className="form-control mb-3"
                    onChange={e => setItem(e.target.value)}
                ></input>
                <span
                    className="btn position-absolute badge rounded-pill text-muted m-0 p-0 fw-normal"
                    style={{ right: '22px', top: '12px', fontSize: '35px' }}
                    onClick={() => handleAddItem(item)}
                >
                    +
                </span>

                <ul className="list-group list-group-flush" />
                {cardText.map((item, index) => {
                    return (
                        <li className="list-group-item position-relative" key={index}>
                            {item}
                            <span
                                type="button"
                                className="btn-close position-absolute"
                                style={{ right: '5px' }}
                                onClick={() => handleDelete(item)}
                            ></span>
                        </li>
                    );
                })}
                <div className="card-btn mt-2 text-end">
                    <button
                        className="btn btn-outline-danger mx-2"
                        onClick={() => {
                            props.handleShowEditNewCard(false);
                        }}
                    >
                        CANCEL
                    </button>

                    <button
                        className="btn btn-outline-success mx-2"
                        onClick={() => {
                            handleDataUpdate(title, cardText);
                        }}
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditNewCard;

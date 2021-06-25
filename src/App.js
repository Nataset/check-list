import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './component/card';
import NewCard from './component/newCard';
import EditNewCard from './component/editNewCard';

function App() {
    const [data, setData] = useState([]);

    const [showEditNewCard, setShowEditNewCard] = useState(true);

    const handleDelete = deleteData => {
        const new_data = data.filter(data => data.title !== deleteData.title);
        setData(new_data);
        axios
            .post('http://localhost:5000/post/delete', deleteData)
            .then(res => console.log(res.data));
    };

    const handleUpdate = updateData => {
        axios.post('http://localhost:5000/post/update', updateData).then(res => {
            console.log(res.data);
            updateData._id = res.data._id;
            setData(data.concat(updateData));
        });
    };

    const handleShowEditNewCard = () => {
        setShowEditNewCard(!showEditNewCard);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/get').then(res => {
            setData(res.data.data);
        });
    }, []);

    return (
        <div className="d-flex flex-column align-items-center">
            {showEditNewCard ? (
                <NewCard handleShowEditNewCard={handleShowEditNewCard} />
            ) : (
                <EditNewCard
                    handleShowEditNewCard={handleShowEditNewCard}
                    handleUpdate={handleUpdate}
                />
            )}
            {data.map((data, index) => {
                return <Card key={index} data={data} handleDelete={handleDelete} />;
            })}
        </div>
    );
}

export default App;

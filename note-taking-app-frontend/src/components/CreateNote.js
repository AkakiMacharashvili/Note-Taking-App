import React, { useState } from 'react';
import axios from 'axios';
import './CreateNote.css';  

const CreateNote = ({ setNotes, notes, backup, setBackup }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('shopping');
    const [privacy, setPrivacy] = useState('Public');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError('All fields are required.');
            setMessage('');
            return;
        }
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
        const curr = { title, description, category, formattedDate, privacy };
        try {
            const response = await axios.post('http://localhost:5000/createnote', curr);
            setMessage(response.data.message);
            setNotes(response.data.notes); 
            setBackup(response.data.notes); 
            setTitle('');
            setDescription('');
            setPrivacy('Public');
            setCategory('shopping');
            setError('');  
        } catch (error) {
            console.error('Error creating note:', error);
            setError('Failed to create note.');
        }
    };

    return (
        <div className="create-note-container">
            <h2>Create Note</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="shopping">shopping</option>
                <option value="rest">rest</option>
                <option value="cooking">cooking</option>
            </select>
            <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
            </select>
            <button type="submit" onClick={handleClick}>Create Note</button>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CreateNote;

import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !username || !email || !password) {
            setMessage('All fields are required.');
            return;
        }

        const curr = { firstName, lastName, username, email, password };

        try {
            const response = await axios.post('http://localhost:5000/signup', curr);
            setMessage(response.data.message);
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error signing up:', error);
            setMessage('Error signing up. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserAuthentication = ({ notes, setNotes, backup, selectAll }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [error, setError] = useState('');

    const filterNotes = useCallback((user) => {
        console.log(selectAll);
        if (selectAll) {
            setNotes(backup);
        } else if (user) {
            const filteredNotes = backup.filter(note => (note.usern === user.username || note.privacy === 'Public'));
            setNotes(filteredNotes);
        } else {
            const filteredNotes = backup.filter(note => note.privacy === 'Public');
            setNotes(filteredNotes);
        }
    }, [selectAll, setNotes, backup]);

    useEffect(() => {
        filterNotes(loggedInUser);
    }, [loggedInUser, backup, selectAll, filterNotes]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { usernameOrEmail, password });
            setLoggedInUser(response.data.user);
            setError('');
            setUsernameOrEmail('');
            setPassword('');
        } catch (error) {
            setLoggedInUser(null);
            setError('Invalid username/email or password.');
        }
    };

    const handleLogout = () => {
        setUsernameOrEmail('');
        setPassword('');
        setLoggedInUser(null);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
            padding: '2rem',
            maxWidth: '400px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
            <h2 style={{ marginBottom: '1rem', color: '#333' }}>Log In</h2>
            {loggedInUser ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <p>Welcome, {loggedInUser.firstName}!</p>
                    <button style={{
                        padding: '0.8rem',
                        fontSize: '1rem',
                        color: '#fff',
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                    }} onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        style={{
                            marginBottom: '1rem',
                            padding: '0.8rem',
                            fontSize: '1rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100%',
                        }}
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={{
                            marginBottom: '1rem',
                            padding: '0.8rem',
                            fontSize: '1rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100%',
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button style={{
                        padding: '0.8rem',
                        fontSize: '1rem',
                        color: '#fff',
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                    }} onClick={handleLogin}>Login</button>
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default UserAuthentication;

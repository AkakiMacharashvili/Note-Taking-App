const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const users = [];
const notes = [];
let cur_user = { firstName: '', lastName: '', username: '', email: '', password: '' };

function compareUsers(user1, user2) {
    return (
        user1.firstName === user2.firstName &&
        user1.lastName === user2.lastName &&
        user1.username === user2.username &&
        user1.email === user2.email &&
        user1.password === user2.password
    );
}

// Route to handle sign-up requests
app.post('/signup', (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    users.push({ firstName, lastName, username, email, password });
    res.status(201).send({ message: 'User registered successfully' });
});

// Route to handle login requests
app.post('/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const user = users.find(
        u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );

    if (user) {
        res.status(200).send({ message: 'Login successful', user });
        cur_user = user;
    } else {
        cur_user = { firstName: '', lastName: '', username: '', email: '', password: '' };
        res.status(401).send({ message: 'Invalid username/email or password' });
    }
});

app.post('/createnote', (req, res) => {
    const { title, description, category, formattedDate, privacy } = req.body;
    // console.log(formattedDate)
    const temp = { firstName: '', lastName: '', username: '', email: '', password: '' };

    const now = compareUsers(cur_user, temp);
    if (now) {
        res.status(401).send({ message: 'Please log in the system...' });
    } else {
        // console.log(cur_user);
        // const usern = cur_user.username;
        // console.log(createDate)
        notes.push({ title, description, category, usern: cur_user.username, formattedDate,  privacy });
        res.status(201).send({ message: 'Note registered successfully', notes });
        // console.log(notes);
    }
});

app.delete('/deletenote', (req, res) => {
    const { title, description } = req.body;  
    const index = notes.findIndex(note => note.title === title && note.description === description);
    if (index !== -1) {
        notes.splice(index, 1);
        res.status(200).send({ message: 'Note deleted successfully' });
    } else {
        res.status(404).send({ message: 'Note not found' });
    }
});
// app.delete('/deletenote', (req, res) => {
//     const { title, description } = req.params;
//     const index = notes.findIndex(note => note.title === title);
//     if (index !== -1) {
//         notes.splice(index, 1);
//         res.status(200).send({ message: 'Note deleted successfully' });
//         // console.log(notes);
//     } else {
//         res.status(404).send({ message: 'Note not found' });
//     }
// });


app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

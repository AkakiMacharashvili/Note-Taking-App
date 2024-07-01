import React, { useState, useEffect } from 'react';
import './App.css';
import CreateNote from './components/CreateNote';
import SignUp from './components/SignUp';
import Notes from './components/Notes';
import UserAuthentication from './components/Log';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [backup, setBackup] = useState([]);
  const [user, setUser] = useState('');
  const [down, setDown] = useState('');
  const [up, setUp] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (e) => {
      setSelectAll(e.target.checked);
      if (e.target.checked) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
      setBackup(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const sortByTitle = () => {
    const sorted = [...notes].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    setNotes(sorted);
  };

  const sortByCategory = () => {
    const sorted = [...notes].sort((a, b) => a.category.toLowerCase().localeCompare(b.category.toLowerCase()));
    setNotes(sorted);
  };

  const sortByCreateDate = () => {
    const sorted = [...notes].sort((a, b) => a.formattedDate.localeCompare(b.formattedDate));
    setNotes(sorted);
  };

  const filterTitle = () => {
    const filteredNotes = notes.filter(note => note.title.toLowerCase() === title.toLowerCase());
    setNotes(filteredNotes);
  };

  const filterDesc = () => {
    const filteredNotes = notes.filter(note => note.description === description);
    setNotes(filteredNotes);
  };

  const filterCategory = () => {
    const filteredNotes = notes.filter(note => note.category === category);
    setNotes(filteredNotes);
  };

  const filterUser = () => {
    const filteredNotes = notes.filter(note => note.usern === user);
    setNotes(filteredNotes);
  };

  const filterDate = () => {
    const filteredNotes = notes.filter(note => {
      const noteDate = note.formattedDate;
      return noteDate >= down && noteDate <= up;
    });

    setNotes(filteredNotes);
  };

  return (
    <div className="App">
     <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
          <h1>Note-Taking App</h1>
      </div>
      <CreateNote setNotes={setNotes} notes={notes} backup={backup} setBackup={setBackup} />
      <SignUp />
      <UserAuthentication notes = {notes} setNotes={setNotes} backup={backup}  selectAll={selectAll}/>
      <h1>Tools</h1>

      
      <div style={{display:'flex', flexDirection: 'row', width: '100%'}}>
      <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={sortByTitle} style={{
              height: '50px',
              padding: '0.8rem',
              fontSize: '1rem',
              color: '#fff',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
          }}>Sort by Title</button>
          <button onClick={sortByCategory} style={{
              height: '50px',
              padding: '0.8rem',
              fontSize: '1rem',
              color: '#fff',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
          }}>Sort by Category</button>
          <button onClick={sortByCreateDate} style={{
              height: '50px',
              padding: '0.8rem',
              fontSize: '1rem',
              color: '#fff',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
               // Full width button
          }}>Sort by Create Date</button>
      </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
                width: '80%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
            />
            <button
            onClick={filterTitle}
            style={{
                width: '80%',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
            }}
            >
            Filter by Title
            </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
                width: '80%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
            />
            <button
            onClick={filterDesc}
            style={{
                width: '80%',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
            }}
            >
            Filter by Description
            </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
                width: '80%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
            />
            <button
            onClick={filterCategory}
            style={{
                width: '80%',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
            }}
            >
            Filter by Category
            </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <input
            type="text"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{
                width: '80%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
            />
            <button
            onClick={filterUser}
            style={{
                width: '80%',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
            }}
            >
            Filter by User
            </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <input
            type="text"
            placeholder="Start Date"
            value={down}
            onChange={(e) => setDown(e.target.value)}
            style={{
                width: '80%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
            />
            <input
            type="text"
            placeholder="End Date"
            value={up}
            onChange={(e) => setUp(e.target.value)}
            style={{
                width: '80%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
            }}
            />
            <button
            onClick={filterDate}
            style={{
                width: '80%',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
            }}
            >
            Filter by Date
            </button>
        </div>
      
        <button onClick={() => setNotes(backup)} style={{
              height: '50px',
              padding: '0.8rem',
              fontSize: '1rem',
              color: '#fff',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '10%'
          }}>Reset</button>

          <label style={{ marginBottom: '1rem', color: '#333' }}>
            <input 
                type="checkbox" 
                checked={selectAll}
                onChange={handleCheckboxChange}
            />
            All Users
        </label>
      </div>

      
      <Notes notes={notes} setNotes={setNotes} backup={backup} setBackup={setBackup}/>
    </div>
  );
}

export default App;

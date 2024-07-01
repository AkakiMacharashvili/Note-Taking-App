import React from 'react';
import axios from 'axios';
import './Notes.css';

const Notes = ({ notes, setNotes, backup, setBackup }) => {
  // const handleDelete = async (title, description) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/deletenode', title);
  //     setNotes(prevNotes => prevNotes.filter(note => (note.title !== title && note.description !== description) ||
  //                                                    (note.title === title && note.description !== description) || 
  //                                                    (note.title !== title && note.description === description)));
  //     setBackup(prevBackup => prevBackup.filter(note => (note.title !== title && note.description !== description) ||
  //                                                     (note.title === title && note.description !== description) || 
  //                                                     (note.title !== title && note.description === description)));
  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error('Error deleting note:', error);
  //     alert('Failed to delete note.');
  //   }
  // };
  const handleDelete = async (title, description) => {
      try {
          const response = await axios.delete(`http://localhost:5000/deletenote`, {
              data: { title, description } 
          });
          
          setNotes(prevNotes => {
            const index = prevNotes.findIndex(note => note.title === title && note.description === description);
            if (index !== -1) {
              const newNotes = [...prevNotes];
              newNotes.splice(index, 1);
              return newNotes;
            }
            return prevNotes;
          });
          
          setBackup(prevBackup => {
            const index = prevBackup.findIndex(note => note.title === title && note.description === description);
            if (index !== -1) {
              const newBackup = [...prevBackup];
              newBackup.splice(index, 1);
              return newBackup;
            }
            return prevBackup;
          });
          // setNotes(prevNotes => prevNotes.filter(note => (note.title !== title && note.description !== description) ||
          //                                                (note.title === title && note.description !== description) || 
          //                                                (note.title !== title && note.description === description)));
          // setBackup(prevBackup => prevBackup.filter(note => (note.title !== title && note.description !== description) ||
          //                                                   (note.title === title && note.description !== description) || 
          //                                                   (note.title !== title && note.description === description)));
          alert(response.data.message);
      } catch (error) {
          console.error('Error deleting note:', error);
          alert('Failed to delete note.');
      }
  };
  return (
    <div className="notes-container">
      <h1 className="notes-title">Notes</h1>
      <table className="notes-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Assignee</th>
            <th>Created</th>
            <th>Description</th>
            <th>Privacy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td>{note.title}</td>
              <td>{note.category}</td>
              <td>{note.usern}</td>
              <td>{note.formattedDate}</td>
              <td>{note.description}</td>
              <td>{note.privacy}</td>
              <td className="note-actions">
                <svg
                  onClick={() => handleDelete(note.title, note.description)}
                  viewBox="0 0 24 24"
                  className="delete-icon"
                >
                  <path d="M19 13H5v-2h14v2zm-7-9C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notes;

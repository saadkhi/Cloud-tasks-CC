import { useState, useEffect } from "react";
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const getNotes = () => {
        api
        .get("/api/notes/")
        .then((res) => {
            setNotes(res.data);
        })
        .catch(err => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert ("Note Deleted")
            else alert("An error occurred in deleting the note.")
            getNotes();
        }).catch(err => alert(err));
        
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", {content, title}).then((res) => {
            if (res.status === 201) alert("Note created")
            else alert("An error occurred in creating the note.")
            getNotes();
        }).catch((err) => alert(err))
        
    }

    return <div className="home-container">
        <div className="notes-section">
            <h2> Notes </h2>
            <div className="notes-list">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="note-card">
                            <Note note={note} onDelete={deleteNote} />
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No notes yet. Create one to get started!</p>
                    </div>
                )}
            </div>
        </div>
        <div className="create-note-section">
            <h2> Create a note</h2>
            <form className="create-note-form" onSubmit={createNote}>
                <div className="form-group">
                    <label htmlFor="title"> Title </label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required
                        onChange={(e) => setTitle(e.target.value)} 
                        value = {title}
                    /> 
                </div>
                <div className="form-group">
                    <label htmlFor="content"> Content: </label>
                    <textarea 
                        id="content" 
                        name="content" 
                        required
                        onChange={(e) => setContent(e.target.value)} 
                        value = {content}
                    /> 
                </div>
                <input className="submit-button" type="submit" value="Create Note" />
            </form>
        </div>
    </div>;
}

export default Home
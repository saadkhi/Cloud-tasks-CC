import React from "react"

function Note({note, onDelete}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    return (
        <>
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">📅 {formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                🗑️ Delete
            </button>
        </>
    );
}

export default Note;
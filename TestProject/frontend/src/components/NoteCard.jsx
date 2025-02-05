import { useState } from "react";
import axios from 'axios';

export default function NoteCard({ note, onDelete }) {
 

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/user/${faq._id}/delete`);

            onDelete(note._id);
        } catch (error) {
            console.error("Error deleting Note:", error);
        }
    };

    return (
        <div className="note-card">
          
                <div>
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                    <div className="note-actions">
                        
                        <button onClick={handleDelete} className="btn-delete">Delete</button>
                    </div>
                </div>
        
        </div>
    );
}

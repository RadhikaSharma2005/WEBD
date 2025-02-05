
import { useState } from "react";

import axios from 'axios'

export default function AddFaq({ onNoteAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        ;
        
        try {
            const res = await axios.post('http://localhost:3000/user/add-note', {
                title: title,
                description: description
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const newNote = res.data.result;
            // console.log(newFaq.updatedFaq)
            onNoteAdded(newNote); 
            setTitle("");
            setDescription("");
        } catch (e) {
            console.log(e)
            setError("Error adding Note. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-note">
            <h2>Add New Note</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Enter Note"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading} className="btn-add">
                    {loading ? "Adding..." : "Add Notes"}
                </button>
            </form>
        </div>
    );
}

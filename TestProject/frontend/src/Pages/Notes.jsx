import { useEffect, useState } from "react";
import axios from 'axios'
import Anote from "../components/anote";

import UserNav from "../components/UserNav";
export default function Notes()
{
 
    const [notes,setNotes] = useState([]);
    useEffect(()=>{
        async function fetchNote()
        {
            try{
                const res = await axios.get(`http://localhost:3000`);
                console.log(res.data);
                setNotes(res.data.Notes);
            }
            catch(e)
            {
                console.error(e);
            }
        }
        fetchNote();
  
    },[])
    
    return (
        <div className="users-container">
            <UserNav ></UserNav>
            <div className="Note-list">
            {
                notes.map((note,index)=>(
                    <Anote note={note} key={note._id}></Anote>
                ))
            }
            </div>
        </div>
    )
}
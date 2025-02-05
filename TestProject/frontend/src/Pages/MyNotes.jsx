
import AddNotes from "../components/AddNotes";
import NoteCard from "../components/NoteCard";
import UserNav from "../components/UserNav";
export default function MyNotes ()
{
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user/note');
                // console.log(res.data)
                setNotes(res.data.notes);
            } catch (e) {
                console.error(e);
                setError("Failed to load Notes.");
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, []);
    
    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    };

    const handlenoteAdded =  (newnote) => {
        try {
            
            setNotes((prevnotes) => [newnote, ...prevnotes]);
            
            
            // if(res.)
        } catch (e) {
            // console.log(e);

            setNotes((prevnotes) => prevnotes.filter((note) => note._id !== newnote._id));
            setError("Failed to add notes.");


        }
    };
    return(
        <div>
            <UserNav></UserNav>
            <AddNotes onNoteAdded={handlenoteAdded}></AddNotes>
            {notes.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={handleDelete} />
            ))}
        </div>
    )
   
}
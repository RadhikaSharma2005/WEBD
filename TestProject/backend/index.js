const express = require("express")
const app = express();

app.use(express.json());

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/NoteProject");
    console.log("Connection is Up");
}
main();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['POST','GET','PUT'], 
    allowedHeaders: ['Content-Type'], 
    credentials: true 
  }

  app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/noteRoutes');
app.use('/',notesRoutes)
app.use('/user',userRoutes);

app.listen(3000,()=>{
    console.log("server is listening on 3000");
})
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Notes from './Pages/Notes'
import './App.css'
import MyNotes from './Pages/MyNotes';
const router = createBrowserRouter([
  {path : '/myNote',
    element : <MyNotes></MyNotes>
  },
  {
    path : '/',
    element : <Notes></Notes>
  }
])
function App() {
 

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

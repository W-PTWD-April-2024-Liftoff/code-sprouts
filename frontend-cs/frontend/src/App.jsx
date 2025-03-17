import './App.css'
import Home from './Home'
import BookView from './Book/BookView';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import NavBar  from './component/NavBar.jsx';"./component/NavBar.jsx"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddBook from './Book/AddBook.jsx';
function App() {
 return (
           <main className="container mt-5">
   <Router>
  <NavBar/>
  <Routes>
     <Route exact path="/book" element={<BookView/>}></Route>
     <Route exact path="/book/add" element={<AddBook/>}></Route>
             </Routes>
            </Router>
      </main>
    
  
  )
}
export default App

import './App.css'
import Home from './Home'
import BookView from './Book/BookView';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import NavBar  from './component/NavBar.jsx';"./component/NavBar.jsx"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
 return (
    <>
      <div className='App'>
   <Router>
  <NavBar/>
  <Routes>
     <Route exact path="/book" element={<BookView/>}></Route>
             </Routes>
            </Router>
      </div>
    
    </>
  )
}
export default App

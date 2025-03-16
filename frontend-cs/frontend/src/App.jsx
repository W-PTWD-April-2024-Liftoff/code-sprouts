import './App.css'
import Home from './Home'
import BookView from './Book/BookView';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
function App() {
 return (
    <>
      <div className='App'>
     <h2> welcome to front-end</h2>
     <Home/>
     <BookView/>
      </div>
    
    </>
  )
}
export default App

//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;
//
import { useState } from "react";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      //dispatch action from hooks
    }
    alert("Please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
//
  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="example@yahoo.com"
          aria-describedby="user-email"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-email" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          Your password should be more than 6 characters.
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;
//import './App.css'
//import Home from './Home'
//import BookView from './Book/BookView';
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
//import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
//import NavBar  from './component/NavBar.jsx';"./component/NavBar.jsx"
//import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
//import AddBook from './Book/AddBook.jsx';
//import BookDetails from './Book/BookDetails.jsx';
//import UpdateBook from './Book/UpdateBook.jsx';
//function App() {
// return (
//           <main className="container mt-5">
//   <Router>
//  <NavBar/>
//  <Routes>
//     <Route exact path="/book" element={<BookView/>}></Route>
//     <Route exact path="/book/add" element={<AddBook/>}></Route>
//     <Route exact path="/book/viewById/:id" element={<BookDetails/>}></Route>
//     <Route exact path="/book/update/:id" element={<UpdateBook/>}></Route>
//
//
//             </Routes>
//            </Router>
//      </main>
//
//
//  )
//}
//export default App
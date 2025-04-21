// import "./App.css";
// import React from "react";
// //import Home from "./Home";
// import BookView from "./Book/BookView";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
// //import NavBar from "./component/NavBar.jsx";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AddBook from "./Book/AddBook.jsx";
// import BookDetails from "./Book/BookDetails.jsx";
// import UpdateBook from "./Book/UpdateBook.jsx";
// //import SearchBook from "./Book/SearchBook.jsx";
// //test
// // function App() {
// //   return (
// //     <main className="container mt-5">
// //       <Router>
// //         <NavBar />
// //         <Routes>
// //           <Route exact path="/book" element={<BookView />}></Route>
// //           <Route exact path="/book/add" element={<AddBook />}></Route>
// //           <Route
// //             exact
// //             path="/book/viewById/:id"
// //             element={<BookDetails />}
// //           ></Route>
// //           <Route exact path="/book/update/:id" element={<UpdateBook />}></Route>
// //         </Routes>
// //       </Router>
// //     </main>
// //   );

// // App.js
// //import React from "react";
// //import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/auth/common/Navbar";
// import LoginPage from "./components/auth/LoginPage";
// import RegistrationPage from "./components/auth/RegistrationPage";
// import FooterComponent from "./components/auth/common/Footer";
// import UserService from "./components/service/UserService";
// import UpdateUser from "./components/userspage/UpdateUser";
// import UserManagementPage from "./components/userspage/UserManagementPage";
// import ProfilePage from "./components/userspage/ProfilePage";
// import GoogleRedirectLoginPage from "./components/GoogleRedirectLoginPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Navbar />
//         <div className="content">
//           <Routes>
//             <Route exact path="/book" element={<BookView />}></Route>
//             <Route exact path="/book/add" element={<AddBook />}></Route>
//             <Route
//               exact
//               path="/book/viewById/:id"
//               element={<BookDetails />}
//             ></Route>
//             <Route
//               exact
//               path="/book/update/:id"
//               element={<UpdateBook />}
//             ></Route>
//             {/* <Route
//               exact
//               path="/book/search/:query"
//               element={<SearchBook />}
//             ></Route> */}
//             <Route exact path="/" element={<LoginPage />} />
//             <Route exact path="/login" element={<LoginPage />} />
//             <Route path="/google-login" element={<GoogleRedirectLoginPage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/register" element={<RegistrationPage />} />{" "}
//             <Route
//               path="/admin/user-management"
//               element={<UserManagementPage />}
//             />
//             <Route
//               path="/admin/user-management"
//               element={<UserManagementPage />}
//             />
//             <Route path="/update-user/:userId" element={<UpdateUser />} />
//             {/* Check if user is authenticated and admin before rendering admin-only routes */}
//             {UserService.adminOnly() && <></>}
//             <Route path="*" element={<Navigate to="/login" />} />‰
//           </Routes>
//         </div>
//         <FooterComponent />
//       </div>
//     </BrowserRouter>
//   );
// }
// export default App;
import "./App.css";
import React from "react";
import BookView from "./Book/BookView";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
("./component/NavBar.jsx");
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddBook from "./Book/AddBook.jsx";
import BookDetails from "./Book/BookDetails.jsx";
import UpdateBook from "./Book/UpdateBook.jsx";
import SearchBook from "./Book/SearchBook.jsx";
import Navbar from "./components/auth/common/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import FooterComponent from "./components/auth/common/Footer";
import UserService from "./components/service/UserService";
import UpdateUser from "./components/userspage/UpdateUser";
import UserManagementPage from "./components/userspage/UserManagementPage";
import ProfilePage from "./components/userspage/ProfilePage";
import GoogleRedirectLoginPage from "./components/GoogleRedirectLoginPage";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/book" element={<BookView />}></Route>
            <Route exact path="/book/add" element={<AddBook />}></Route>
            <Route
              exact
              path="/book/viewById/:id"
              element={<BookDetails />}
            ></Route>
            <Route
              exact
              path="/book/update/:id"
              element={<UpdateBook />}
            ></Route>
            {<Route
              exact
              path="book/search/:query"
              element={<SearchBook />}
            ></Route>}
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/google-login" element={<GoogleRedirectLoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegistrationPage />} />{" "}
            <Route
              path="/admin/user-management"
              element={<UserManagementPage />}
            />
            <Route
              path="/admin/user-management"
              element={<UserManagementPage />}
            />
            <Route path="/update-user/:userId" element={<UpdateUser />} />
            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && <></>}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}
export default App;
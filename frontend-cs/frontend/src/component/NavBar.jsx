import React  from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
        <div classNames ="container-fluid">
  <Link className="navbar-brand" to={"/"}>BookShelf</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
   <div classNames="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <Link className="navbar-brand" to={"/book"}>All Books</Link></li>
        <li className="nav-item">
      <Link className="navbar-brand" to={"/book/add"}>Add Books</Link>
      </li>
    </ul>
   
    </div>
  </div>
</nav>
  );
};

export default NavBar;

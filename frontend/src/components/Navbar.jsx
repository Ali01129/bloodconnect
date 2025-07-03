import React from 'react';
import { useNavigate } from "react-router-dom";
import './navbar.css'

const Navbar = ({fetchData}) => {
  const navigate = useNavigate();

  
  const godash=()=>{
    navigate("/");
    fetchData();
  }
  const goreg=()=>{
    navigate("/register");
  }
  return (
    <div className="container-fluid my-2">
      <ul className="nav d-flex align-items-center justify-content-between">
        <li className="nav-item">
        <button className="nav-link logo active" onClick={godash} >
          BloodConnect
        </button>
        </li>
        <div className="nav-item" style={{display: 'flex',fontFamily: 'Signika, sans-serif'}}>
          {/* Rest of the items in the middle */}
          <button className="nav-link hov" onClick={godash}>
            Home
          </button>
          <button className="nav-link hov"onClick={goreg}>
            Register
          </button>
          <button className="nav-link disabled" disabled>
            Made by Ali Nawaz
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
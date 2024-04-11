import React from 'react';
import backgroundImage from './db.png';
import './home.css'

const Home = () => {
  return (
    <div>
        <div className="container my-4" style={{height: "550px",display:'flex',alignItems: 'center', justifyContent: 'center'}}>
            <div className="left" style={{flex:1,textAlign:"center"}}>
                <div className="container" style={{fontSize:"50px",fontWeight:"bold"}}>
                    <div>Every Drop Counts, Every Donor Matters</div>
                </div>
                <button className='b1 my-4 mx-2'><b>View Donnors</b></button>
                <button className='b1 my-4'><b>Register</b></button>
            </div>
            <div className="right"style={{flex:1}}>
                <img src={backgroundImage} alt="Background" style={{width: '100%', height: '100%', objectFit: 'cover'}} />  
            </div>
        </div>
    </div>
  );
};

export default Home;

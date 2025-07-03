import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./register.css";

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const [city,setCity]=useState('');
    const [ph1, setPh1] = useState('');
    const [ph2, setPh2] = useState('');
    const [error, setError] = useState('');

    const godash=()=>{
        navigate("/");
      }
      const goreg=()=>{
        navigate("/register");
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let requestBody = {
                name: name,
                group: group,
                city: city,
                phone1: ph1
            };

            if (ph2 !== '') {
                requestBody.phone2 = ph2;
            }

            const response = await fetch(`${window.location.origin}/api/getdonor/adddonor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/');
            } else {
                if (data.errors && data.errors[0].msg) {
                    setError(data.errors[0].msg);
                } else {
                    setError("An error occurred while registering the donor.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while processing your request.");
        }
    };

    return (
        <>
            {/* navbar */}
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
            {/* for the register component */}
            <div className="wrapper">
                <div className="flip-card__inner mt-5">
                    <div className="flip-card__front">
                        <div className="title">Register Donor</div>
                        <form className="flip-card__form" onSubmit={handleSubmit}>
                            <input className="flip-card__input" name="Name" placeholder="Name" type="text" required onChange={(e) => { setName(e.target.value) }} />
                            <input className="flip-card__input" name="group" placeholder="Blood Group (example: A+)" type="text" required onChange={(e) => { setGroup(e.target.value) }} />
                            <input className="flip-card__input" name="group" placeholder="City" type="text" required onChange={(e) => { setCity(e.target.value) }} />
                            <input className="flip-card__input" name="password" placeholder="Phone Number" type="text" required onChange={(e) => { setPh1(e.target.value) }} />
                            <input className="flip-card__input" name="password" placeholder="Phone Number (Additional)" type="text" onChange={(e) => { setPh2(e.target.value) }} />
                            <button className="flip-card__btn">Register</button>
                        </form>
                        <div className="register-text">{error}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;

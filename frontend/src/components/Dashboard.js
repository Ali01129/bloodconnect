import React, {useEffect,useState} from 'react';
import './dashboard.css';
import Card from './Card';
import Navbar from './Navbar';

const Dashboard = () => {

    const[donors,setDonors]=useState([]);
    const [search,setSearch]=useState('');

    useEffect(()=>{
        fetchData();  
        //eslint disable-next-line
    },[])

    const fetchData=async()=> {
        const response = await fetch(`${window.location.origin}/api/getdonor/viewdonor`, {
            method: 'POST'
        });
        const data=await response.json();
        setDonors(data.donors)
    }

    const handleKeyDown=async(event)=>{
        if (event.key === 'Enter') {
            if(search===''){
                fetchData();
            }
            else{
                const response=await fetch(`${window.location.origin}/api/getdonor/searchdonor`,{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name:search}),
                });
                const data=await response.json();
                setDonors(data.donors);
            }
        }
    }

    const handleClick=async(event)=>{
        const buttonText = event.target.textContent;
        const response=await fetch(`${window.location.origin}/api/getdonor/searchgroup`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({group:buttonText}),
        });
        const data=await response.json();
        setDonors(data.donors);
    }


  return (
    <>
        <Navbar fetchData={fetchData}/>
        <div className="container-fluid">
            <div className="container"style={{fontFamily: 'Signika, sans-serif',textAlign:"center",color:"black"}}>
                <div className='text'>Blood Donors</div>
                <div className="container">
                    <input className='searchbar' type="text"placeholder="Search Donors" onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={handleKeyDown}/>
                </div>
                <div className="container my-5">
                    <div className="row">
                        <button className="group col " onClick={(event) => handleClick(event)}>A+</button>
                        <button className="group col " onClick={(event) => handleClick(event)}>A-</button>
                        <button className="group col " onClick={(event) => handleClick(event)}>B+</button>
                        <button className="group col " onClick={(event) => handleClick(event)}>B-</button>
                        <button className="group col " onClick={(event) => handleClick(event)}>O+</button>
                        <button className="group col " onClick={(event) => handleClick(event)}>O-</button>
                        <button className="group col " onClick={(event) => handleClick(event)}>AB+</button>
                        <button className="group col " onClick={(event) => handleClick(event)}>AB-</button>
                    </div>
                </div>
            </div>
            <div className="container custom-container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {donors.map((element, index) => {
                return (
                    <div key={index} className="col mb-4">
                    <Card name={element.name} group={element.group} city={element.city} ph1={element.phone1} ph2={element.phone2} />
                    </div>
                );
                })}
            </div>
            </div>

        </div>
    </>
  )
}

export default Dashboard

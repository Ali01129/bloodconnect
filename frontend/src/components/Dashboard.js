import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Card from './Card';
import Navbar from './Navbar';
import Spinner from './Spinner';

const Dashboard = () => {
    const [donors, setDonors] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [toshow, setToshow] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []); // Fetch initial data when component mounts

    useEffect(() => {
        updateData();
    }, [donors, page]);

    const updateData = () => {
        const start = (page - 1) * 21;
        const end = start + 21;
        setToshow(donors.slice(start, end));
    }

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`${window.location.origin}/api/getdonor/viewdonor?page=${page}`, {
            method: 'POST'
        });
        const data = await response.json();
        setDonors(data.donors);
        setLoading(false);
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            setLoading(true);
            if (search === '') {
                fetchData();
            } else {
                const response = await fetch(`${window.location.origin}/api/getdonor/searchdonor`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: search }),
                });
                const data = await response.json();
                setDonors(data.donors);
                setLoading(false);
                setPage(1);
            }
        }
    }

    const handleClick = async (event) => {
        setLoading(true);
        const buttonText = event.target.textContent;
        const response = await fetch(`${window.location.origin}/api/getdonor/searchgroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ group: buttonText }),
        });
        const data = await response.json();
        setDonors(data.donors);
        setLoading(false);
        setPage(1);
    }

    const nextClick = () => {
        setPage(page + 1);
    }

    const previousClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <>
            <Navbar fetchData={fetchData} />
            <div className="container-fluid">
                <div className="container" style={{ fontFamily: 'Signika, sans-serif', textAlign: "center", color: "black" }}>
                    <div className='text'>Blood Donors</div>
                    <div className="container">
                        <input className='searchbar' type="text" placeholder="Search Donors" onChange={(e) => { setSearch(e.target.value) }} onKeyDown={handleKeyDown} />
                    </div>
                    <div className="container my-5">
                        <div className="row">
                            <button className="group col" onClick={(event) => handleClick(event)}>A+</button>
                            <button className="group col" onClick={(event) => handleClick(event)}>A-</button>
                            <button className="group col" onClick={(event) => handleClick(event)}>B+</button>
                            <button className="group col" onClick={(event) => handleClick(event)}>B-</button>
                            <button className="group col" onClick={(event) => handleClick(event)}>O+</button>
                            <button className="group col" onClick={(event) => handleClick(event)}>O-</button>
                            <button className="group col" onClick={(event) => handleClick(event)}>AB+</button>
                            <button className="group col" onClick={(event) => handleClick(event)}>AB-</button>
                        </div>
                    </div>
                </div>
                {loading&&<Spinner/>}
                <div className="container custom-container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {toshow.map((element, index) => {
                            return (
                                <div key={index} className="col mb-4">
                                    <Card name={element.name} group={element.group} city={element.city} ph1={element.phone1} ph2={element.phone2} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark my-6" onClick={previousClick}>&larr; Previous</button>
                    <button disabled={donors.length <= page * 21} type="button" className="btn btn-dark my-6" onClick={nextClick}>Next &rarr;</button>
                </div>
                <div style={{ color: 'white' }}>made by ali</div>
            </div>
        </>
    )
}

export default Dashboard;

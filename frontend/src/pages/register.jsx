import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navigation/Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [city, setCity] = useState('');
  const [ph1, setPh1] = useState('');
  const [ph2, setPh2] = useState('');
  const [error, setError] = useState('');

  const godash = () => navigate("/");
  const goreg = () => navigate("/register");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let requestBody = {
        name,
        group,
        city,
        phone1: ph1,
      };

      if (ph2 !== '') requestBody.phone2 = ph2;

      const response = await fetch(`${window.location.origin}/api/getdonor/adddonor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div className="min-h-screen bg-[#f1f1f1]">
      {/* Navbar */}
      <Navbar />

      {/* Register Form */}
      <div className="flex justify-center items-center mt-10 px-4">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Register Donor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="text"
              placeholder="Blood Group (example: A+)"
              required
              onChange={(e) => setGroup(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="text"
              placeholder="City"
              required
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="text"
              placeholder="Phone Number"
              required
              onChange={(e) => setPh1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="text"
              placeholder="Phone Number (Additional)"
              onChange={(e) => setPh2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
            >
              Register
            </button>
          </form>
          {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
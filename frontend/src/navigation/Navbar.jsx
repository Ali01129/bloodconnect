import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ fetchData }) => {
  const navigate = useNavigate();

  const godash = () => {
    navigate("/");
    fetchData();
  };

  const goreg = () => {
    navigate("/register");
  };

  return (
    <nav className="w-full px-6 py-4 bg-[#f1f1f1]">
      <div className="flex justify-between items-center flex-wrap">
        {/* Logo */}
        <button
          onClick={godash}
          className="cursor-pointer text-red-700 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl"
          style={{ fontFamily: '"Bungee Spice", sans-serif' }}
        >
          BloodConnect
        </button>

        {/* Menu Items */}
        <div className="flex gap-4 items-center flex-wrap font-[Signika]">
          <button
            onClick={godash}
            className="text-black cursor-pointer hover:text-red-600 text-base sm:text-sm md:text-base transition"
          >
            Home
          </button>
          <button
            onClick={goreg}
            className="text-black cursor-pointer hover:text-red-600 text-base sm:text-sm md:text-base transition"
          >
            Register
          </button>
          <button
            disabled
            className="text-gray-500 text-base sm:text-sm md:text-base cursor-default xs:inline"
          >
            Made by Ali Nawaz
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

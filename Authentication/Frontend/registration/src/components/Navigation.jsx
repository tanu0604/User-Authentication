import React from "react";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      {/* Logo or Brand Name */}
      <div className="text-xl font-semibold tracking-wide">Cab Booking</div>

      {/* Navigation Links */}
      <div className="space-x-4">
        <a 
          href="/login" 
          className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Login
        </a>
        <a 
          href="/signup" 
          className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition duration-300"
        >
          Signup
        </a>
      </div>
    </nav>
  );
};

export default Navigation;

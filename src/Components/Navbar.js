import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onSignOut, isAuthenticated }) => {
  const location = useLocation(); // Get current location to highlight active link

  return (
    <nav className="bg-blue-600 py-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex space-x-8">
          {!isAuthenticated ? ( // Show Login and Signup if not authenticated
            <>
              <Link
                to="/"
                className={`text-white font-medium px-4 py-2 rounded transition duration-300 ${
                  location.pathname === "/"
                    ? "bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`text-white font-medium px-4 py-2 rounded transition duration-300 ${
                  location.pathname === "/signup"
                    ? "bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
              >
                Signup
              </Link>
            </>
          ) : (
            // Show List and Sign Out if authenticated
            <>
              <Link
                to="/list"
                className={`text-white font-medium px-4 py-2 rounded transition duration-300 ${
                  location.pathname === "/list"
                    ? "bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
              >
                List
              </Link>
              <Link
                to="/popup"
                className={`text-white font-medium px-4 py-2 rounded transition duration-300 ${
                  location.pathname === "/popup"
                    ? "bg-blue-700"
                    : "hover:bg-blue-500"
                }`}
              >
                Tracker
              </Link>
              <button
                onClick={onSignOut}
                className="text-white font-medium px-4 py-2 rounded transition duration-300 hover:bg-blue-500"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

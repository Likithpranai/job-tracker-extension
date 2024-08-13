// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import LoginPage from "./Components/Login";
import Popup from "./Components/Popup";
import List from "./Components/List"; // Import the List component
import { auth } from "./Firebase/firebase";
import { signOut } from "firebase/auth";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to hold the user object

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Set true if user exists
      setUser(user); // Set the user object
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      setIsAuthenticated(false); // Update authentication state
      setUser(null); // Clear user object on sign out
    } catch (error) {
      console.error("Error signing out:", error); // Log any errors
      alert("An error occurred while signing out. Please try again."); // Alert the user
    }
  };

  return (
    <Router>
      <Navbar
        onSignOut={handleSignOut}
        isAuthenticated={isAuthenticated}
        user={user}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/list" element={<List userId={user?.uid} />} />{" "}
        {/* Add List route */}
      </Routes>
    </Router>
  );
};

export default App;

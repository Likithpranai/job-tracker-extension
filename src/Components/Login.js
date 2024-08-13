import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Redirect the user to the Popup component
        navigate("/popup");
      }
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigate]);

  const handleLogin = async () => {
    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect the user to the Popup component
      navigate("/popup");
      console.log("User logged in successfully!");
    } catch (error) {
      // Handle login errors with a generic message
      console.error("Error logging in:", error);
      alert(
        "Login failed. Please check your email and password and try again."
      ); // Generic alert for incorrect credentials
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 w-80">
      <h1 className="text-xl font-bold mb-6 text-center">Login</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          required
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <Link to="/signup">
        <div className="text-center mt-4">
          <a
            className="text-blue-500 hover:text-blue-800 text-sm"
            href="/signup"
          >
            Don't have an account? Sign up
          </a>
        </div>
      </Link>
    </div>
  );
};

export default LoginPage;

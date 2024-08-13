import React, { useState } from "react";
import { auth, db } from "../Firebase/firebase"; // Ensure you import Firestore
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Check if the email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        // Display an alert message
        alert("Account already exists");
        setError("Account already exists");
        return;
      }

      // Create a new user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create a document for the user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        // Add any other user-specific data here
      });

      alert("Signup Successful");
      navigate("/popup"); // Redirect to the Popup or Tracker page after signup
    } catch (error) {
      // Check if the error is a "duplicate email" error
      if (error.code === "auth/email-already-in-use") {
        // Display an alert message
        alert("Account already exists");
        setError("Account already exists");
      } else {
        // Display a generic error alert message
        alert("Error Occurred!");
        setError("Error signing up: " + error.message);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 w-80 mx-auto">
      <h1 className="text-xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <Link to="/">
          <div className="text-center mt-4">
            <a
              className="text-blue-500 hover:text-blue-800 text-sm"
              href="/login"
            >
              Already have an account?
            </a>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { db } from "../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
const Popup = () => {
  const [user, setUser] = React.useState(null);
  const [positionName, setPositionName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [applicationLink, setApplicationLink] = React.useState("");
  const [applyLater, setApplyLater] = React.useState(false);
  const [applied, setApplied] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save the Job Application to FireStore
      await addDoc(collection(db, "JobApplications"), {
        positionName,
        company,
        applicationLink,
        applyLater,
        applied,
        createdAt: new Date(),
      });

      // Reset the form fields
      setPositionName("");
      setCompany("");
      setApplicationLink("");
      setApplyLater(false);
      setApplied(false);

      // Show a success message
      alert("Job Application Saved");
    } catch (error) {
      console.error("Error saving job application:", error);
      alert("Error saving the job application, Please Try Again");
    }
  };
  return (
    <div className="bg-white shadow-md rounded p-4 w-96">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="positionName"
            className="block text-gray-700 font-bold mb-2"
          >
            Position Name
          </label>
          <input
            type="text"
            id="positionName"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-gray-700 font-bold mb-2"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="applicationLink"
            className="block text-gray-700 font-bold mb-2"
          >
            Application Link
          </label>
          <input
            type="text"
            id="applicationLink"
            value={applicationLink}
            onChange={(e) => setApplicationLink(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={applyLater}
              onChange={(e) => setApplyLater(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2 text-gray-700">Apply Later</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="checkbox"
              checked={applied}
              onChange={(e) => setApplied(e.target.checked)}
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2 text-gray-700">Applied</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Popup;

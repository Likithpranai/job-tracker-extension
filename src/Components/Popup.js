import React, { useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions

const Popup = () => {
  const [positionName, setPositionName] = useState("");
  const [company, setCompany] = useState("");
  const [applicationLink, setApplicationLink] = useState("");
  const [applyLater, setApplyLater] = useState(false);
  const [applied, setApplied] = useState(false);
  const user = auth.currentUser;

  // Handle job application submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for duplicates before adding the application
    const isDuplicate = await checkForDuplicateApplication();
    if (isDuplicate) {
      alert("This job application already exists.");
      return; // Prevent submission if duplicate found
    }

    // Determine the status based on the checkbox values
    let status = "Not Applied"; // Default status
    if (applied) {
      status = "Applied";
    } else if (applyLater) {
      status = "Apply Later";
    }

    try {
      // Save the Job Application to Firestore
      await addDoc(collection(db, "JobApplications"), {
        positionName,
        company,
        applicationLink,
        status, // Use the derived status
        userId: user.uid, // Associate the application with the user
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

  // Function to check for duplicate applications
  const checkForDuplicateApplication = async () => {
    try {
      const q = query(
        collection(db, "JobApplications"),
        where("userId", "==", user.uid),
        where("positionName", "==", positionName),
        where("company", "==", company),
        where("applicationLink", "==", applicationLink)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty; // Return true if there are duplicates
    } catch (error) {
      console.error("Error checking for duplicates:", error);
      return false; // Assume no duplicates if there's an error
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 w-96 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Job Application Tracker</h1>
      <form onSubmit={handleSubmit} className="w-full">
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Popup;

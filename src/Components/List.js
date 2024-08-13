import React, { useState } from "react";
import { db } from "../Firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditModal from "./Edit"; // Import the EditModal component

const List = ({ userId }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingApplication, setEditingApplication] = useState(null); // State to track the editing application
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showMoreCount, setShowMoreCount] = useState(5); // State to track the number of applications to show

  // Function to fetch job applications
  const fetchJobApplications = async () => {
    try {
      const q = query(
        collection(db, "JobApplications"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const applications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); // Include the document ID
      setJobApplications(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  React.useEffect(() => {
    fetchJobApplications(); // Call fetchJobApplications when component mounts
  }, [userId]);

  // Function to handle removal of a job application
  const handleRemoveApplication = async (id) => {
    try {
      await deleteDoc(doc(db, "JobApplications", id)); // Delete the document from Firestore
      setJobApplications((prevApplications) =>
        prevApplications.filter((application) => application.id !== id)
      ); // Remove from state
      alert("Job application removed successfully.");
    } catch (error) {
      console.error("Error removing job application:", error);
      alert("Error removing the job application, Please Try Again");
    }
  };

  // Function to handle editing a job application
  const handleEditApplication = (application) => {
    setEditingApplication(application); // Set the editing application in state
  };

  // Function to handle updating the job applications after editing
  const handleUpdateApplications = () => {
    fetchJobApplications(); // Refetch the job applications to update the UI
  };

  // Function to handle closing the edit modal
  const handleCloseModal = () => {
    setEditingApplication(null); // Reset the editing application
  };

  // Filter job applications based on the search term
  const filteredApplications = jobApplications.filter(
    (application) =>
      application.positionName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle "Show More" button click
  const handleShowMore = () => {
    setShowMoreCount(showMoreCount + 5);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Job Applications</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1 w-48"
        />
      </div>
      {loading ? ( // Show loading state
        <p>Loading...</p>
      ) : filteredApplications.length === 0 ? ( // Handle empty state
        <p>No job applications found.</p>
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Application Link</th>
                <th className="px-4 py-2">Actions</th>{" "}
                {/* New Actions Column */}
              </tr>
            </thead>
            <tbody>
              {filteredApplications
                .slice(0, showMoreCount)
                .map((application) => (
                  <tr
                    key={application.id}
                    className={`border-b ${
                      application.index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2">{application.positionName}</td>
                    <td className="px-4 py-2">{application.company}</td>
                    <td className="px-4 py-2">{application.status}</td>
                    <td className="px-4 py-2">
                      <a
                        href={application.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-800"
                      >
                        {application.applicationLink}
                      </a>
                    </td>
                    <td className="px-4 py-2 text-center flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditApplication(application)}
                        className="text-blue-500 hover:text-blue-800 font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveApplication(application.id)}
                        className="text-red-500 hover:text-red-800 font-bold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {filteredApplications.length > showMoreCount && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}

      {/* Render the EditModal if an application is being edited */}
      {editingApplication && (
        <EditModal
          application={editingApplication}
          onClose={handleCloseModal}
          onUpdate={handleUpdateApplications}
        />
      )}
    </div>
  );
};

export default List;

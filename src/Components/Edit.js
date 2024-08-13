import React, { useState } from "react";
import { db } from "../Firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Edit = ({ application, onClose, onUpdate }) => {
  const [positionName, setPositionName] = useState(application.positionName);
  const [company, setCompany] = useState(application.company);
  const [applicationLink, setApplicationLink] = useState(
    application.applicationLink
  );

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "JobApplications", application.id), {
        positionName,
        company,
        applicationLink,
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating job application:", error);
      alert("Error updating the job application, Please Try Again");
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden align-middle sm:inline-block sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:max-h-[80vh]">
          <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Edit Job Application
            </h3>
            <div className="mt-2">
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

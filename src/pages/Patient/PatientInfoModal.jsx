import React from "react";

const PatientInfoModal = ({ patient, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Patient Details</h2>
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {patient.phoneNumber}
          </p>
          <p>
            <strong>Allergies:</strong>{" "}
            {patient.allergies?.join(", ") || "None"}
          </p>
          <p>
            <strong>Chronic Diseases:</strong>{" "}
            {patient.chronicDiseases?.join(", ") || "None"}
          </p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientInfoModal;

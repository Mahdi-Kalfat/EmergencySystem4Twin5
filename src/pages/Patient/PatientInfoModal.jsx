import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientDetails = () => {
  const { patientId } = useParams(); // Get patientId from URL
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await fetch(`http://localhost:3001/users/findBymail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: patientId }), // You can change this logic to match the ID
      });

      const data = await response.json();
      setPatient(data);
    };

    fetchPatient();
  }, [patientId]);

  return (
    <div>
      {patient ? (
        <div>
          <h2>{patient.name}</h2>
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.phoneNumber}</p>
          {/* Add other patient details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientDetails;

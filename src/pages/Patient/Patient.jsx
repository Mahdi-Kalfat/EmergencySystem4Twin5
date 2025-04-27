import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import PatientInfoModal from "./PatientInfoModal";

const Patient = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search field
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced query for search
  const navigate = useNavigate();

  // Fetch patients from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        const response = await fetch("http://localhost:3001/users/display", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        const filteredPatients = data.filter((user) => user.role === "Patient");
        setPatients(filteredPatients);
        setFilteredPatients(filteredPatients); // Initially, show all patients
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching is complete
      }
    };

    fetchPatients();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay to reduce API calls

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Update the filtered results based on the debounced search query
  useEffect(() => {
    const result = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setFilteredPatients(result);
  }, [debouncedQuery, patients]);

  const handleAddClick = () => {
    navigate("/addpatient");
  };

  const handleViewClick = async (email) => {
    try {
      const response = await fetch(`http://localhost:3001/users/findBymail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
          }`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch patient details");
      }

      const patientData = await response.json();
      setSelectedPatient(patientData);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await fetch(`http://localhost:3001/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      // Remove the deleted patient from the state
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== id)
      );

      alert("Patient deleted successfully!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient. Please try again.");
    }
  };

  const getImageByRole = () => {
    return "public/avatar/patient.png"; // Default avatar for patient
  };

  return (
    <div className="app-container bg-gray-100 min-h-screen">
      <div className="sidebar-container">
        <SideBar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      </div>

      <div className="content-container flex flex-col min-h-screen">
        <Header
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />

        <div className="px-4 sm:px-6 pt-6 flex-grow">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                List of Patients
              </h3>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                onClick={handleAddClick}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Patient
              </button>
            </div>

            {/* Search Field */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Search patients by name or email..."
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              />
            </div>

            {/* Patients List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <div className="col-span-full text-center py-6">
                  Loading patients...
                </div>
              ) : filteredPatients.length > 0 ? (
                filteredPatients.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-xl"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                        <img
                          src={getImageByRole()}
                          alt="Patient"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.phoneNumber}
                      </p>

                      <div className="flex justify-center gap-4 mt-6">
                        <button
                          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all"
                          onClick={() =>
                            navigate("/editPatient", {
                              state: { patient: user },
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button
                          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all"
                          onClick={() => handleDeleteClick(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>

                        <button
                          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-all"
                          onClick={() => handleViewClick(user.email)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-6">
                  No patients found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedPatient && (
        <PatientInfoModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default Patient;

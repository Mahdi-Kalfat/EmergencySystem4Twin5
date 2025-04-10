import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar"; // Ajustez le chemin si nécessaire
import Header from "../../components/Header"; // Ajustez le chemin si nécessaire
import PatientInfoModal from "./PatientInfoModal"; // Ajustez le chemin si nécessaire

const Patient = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        const response = await fetch("http://localhost:3000/users//display", {
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

        // Filtrer les utilisateurs pour ne garder que les patients
        const filteredPatients = data.filter((user) => user.role === "Patient");

        setPatients(filteredPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleAddClick = () => {
    navigate("/addpatient");
  };

  const handleViewClick = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/users/findBymail`, {
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
        throw new Error("Failed to fetch patient details");
      }

      const patientData = await response.json();
      setSelectedPatient(patientData);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const getImageByRole = (role) => {
    switch (role) {
      case "Patient":
        return "public/avatar/patient.png"; // Remplacez par le chemin de l'image pour les patients
      default:
        return "src/images/user/default.jpg";
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar-container">
        <SideBar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      </div>

      <div className="content-container">
        <Header
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />

        <div className="space-y-5 sm:space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 py-4 sm:px-6 sm:py-5 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                List Patients
              </h3>
              <button
                className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                onClick={handleAddClick}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                  <table className="min-w-full table-fixed border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-5 py-3 sm:px-6 text-center w-1/4">
                          Image
                        </th>
                        <th className="px-5 py-3 sm:px-6 text-center w-1/4">
                          Name
                        </th>
                        <th className="px-5 py-3 sm:px-6 text-center w-1/4">
                          Email
                        </th>
                        <th className="px-5 py-3 sm:px-6 text-center w-1/4">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {patients.length > 0 ? (
                        patients.map((user) => (
                          <tr key={user.id} className="text-center">
                            <td className="px-5 py-4 sm:px-6">
                              <div className="w-10 h-10 rounded-full overflow-hidden mx-auto">
                                <img
                                  src={getImageByRole(user.role)}
                                  alt="Patient"
                                  className="w-100 h-100 object-cover"
                                />
                              </div>
                            </td>
                            <td className="px-5 py-4 sm:px-6">
                              <div className="flex flex-col items-center">
                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                  {user.name}
                                </span>
                                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                  {user.phoneNumber}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4 sm:px-6">{user.email}</td>
                            <td className="px-5 py-4 sm:px-6">
                              <div className="flex justify-center gap-2">
                                <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button
                                  className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                                  onClick={() => handleViewClick(user.email)}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            No patients found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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

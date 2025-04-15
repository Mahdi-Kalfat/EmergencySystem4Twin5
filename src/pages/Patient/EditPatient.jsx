import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";

const EditPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient } = location.state || {};

  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    country: "",
    city: "",
    allergies: "",
    chronicDiseases: "",
  });

  useEffect(() => {
    if (patient) {
      // Convert array fields to comma-separated strings for the form inputs
      setFormData({
        id: patient.id,
        name: patient.name,
        phoneNumber: patient.phoneNumber,
        country: patient.country,
        city: patient.city,
        allergies: Array.isArray(patient.allergies)
          ? patient.allergies.join(", ")
          : patient.allergies || "",
        chronicDiseases: Array.isArray(patient.chronicDiseases)
          ? patient.chronicDiseases.join(", ")
          : patient.chronicDiseases || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.allergies) newErrors.allergies = "Allergies are required";
    if (!formData.chronicDiseases)
      newErrors.chronicDiseases = "Chronic diseases are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      // Convert comma-separated strings back to arrays
      const allergiesArray = formData.allergies
        ? formData.allergies
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item)
        : [];
      const chronicDiseasesArray = formData.chronicDiseases
        ? formData.chronicDiseases
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item)
        : [];

      const response = await fetch(
        `http://localhost:3001/users/editPatient/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            country: formData.country,
            city: formData.city,
            allergies: allergiesArray,
            chronicDiseases: chronicDiseasesArray,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update patient");
      }

      setMessage("Patient information updated successfully!");
      setTimeout(() => {
        navigate("/patient");
      }, 1000);
    } catch (err) {
      console.error("Error updating patient:", err);
      setMessage(err.message || "Error updating patient information");
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
        <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Edit Patient Information
            </h3>

            {["name", "phoneNumber", "country", "city"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange} // Ajout du gestionnaire d'événements
                  placeholder={field} // Optionnel : Ajout d'un placeholder
                  className={`dark:bg-dark-900 mt-1 w-full rounded-lg border px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            {["allergies", "chronicDiseases"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  placeholder={field}
                  className={`dark:bg-dark-900 mt-1 w-full rounded-lg border px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
            >
              Update Patient
            </button>
            {message && (
              <p
                className={`mt-4 text-sm ${
                  message.includes("successfully")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;

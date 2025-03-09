import React, { useState } from "react";
import SideBar from "../../components/SideBar"; // Import your SideBar component
import Header from "../../components/Header"; // Import your Header component

const AddPersonalForm = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  // State for common inputs
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    password: "",
    age: "",
    admission_date: "",
    conge: "",
    nbr_conge: "",
  });

  // State for role-specific inputs
  const [roleSpecificData, setRoleSpecificData] = useState({});

  // Handle change for common inputs
  const handleCommonInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle change for role-specific inputs
  const handleRoleSpecificInputChange = (e) => {
    const { name, value } = e.target;
    setRoleSpecificData({
      ...roleSpecificData,
      [name]: value,
    });
  };

  // Handle role selection
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData({
      ...formData,
      role,
    });
    // Reset role-specific data when role changes
    setRoleSpecificData({});
  };

  // Render role-specific inputs based on selected role
  const renderRoleSpecificInputs = () => {
    switch (formData.role) {
      case "Doctor":
        return (
          <>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Speciality
              </label>
              <input
                type="text"
                name="speciality"
                value={roleSpecificData.speciality || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Grade
              </label>
              <input
                type="text"
                name="grade"
                value={roleSpecificData.grade || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </>
        );
      case "Nurse":
        return (
          <>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Poste Infirmier
              </label>
              <input
                type="text"
                name="poste_inf"
                value={roleSpecificData.poste_inf || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Grade Infirmier
              </label>
              <input
                type="text"
                name="grade_inf"
                value={roleSpecificData.grade_inf || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </>
        );
      case "Driver":
        return (
          <>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={roleSpecificData.experience || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Garde
              </label>
              <input
                type="text"
                name="garde"
                value={roleSpecificData.garde || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </>
        );
      case "Chef":
        return (
          <>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Speciality Chef
              </label>
              <input
                type="text"
                name="speciality_chief"
                value={roleSpecificData.speciality_chief || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Garde
              </label>
              <input
                type="text"
                name="garde"
                value={roleSpecificData.garde || ""}
                onChange={handleRoleSpecificInputChange}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </>
        );
      case "worker":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Poste
            </label>
            <input
              type="text"
              name="poste"
              value={roleSpecificData.poste || ""}
              onChange={handleRoleSpecificInputChange}
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
        );
      default:
        return null;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const personalData = {
      ...formData,
      ...roleSpecificData,
    };
    console.log("Form Data:", personalData);
    // Submit the form data to your backend or handle it as needed
  };

  return (
    <div className="app-container">
      <div className="sidebar-container">
        <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      </div>
      <div className="content-container">
        <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2 p-6">
          {/* Common Inputs */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                  Personal Information
                </h3>
              </div>
              <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleRoleChange}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  >
                    <option value="">Select Role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Driver">Driver</option>
                    <option value="Chef">Chef</option>
                    <option value="worker">Worker</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    name="admission_date"
                    value={formData.admission_date}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Conge
                  </label>
                  <input
                    type="text"
                    name="conge"
                    value={formData.conge}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Number of Conge
                  </label>
                  <input
                    type="number"
                    name="nbr_conge"
                    value={formData.nbr_conge}
                    onChange={handleCommonInputChange}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role-Specific Inputs */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                  Role-Specific Information
                </h3>
              </div>
              <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                {renderRoleSpecificInputs()}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonalForm;
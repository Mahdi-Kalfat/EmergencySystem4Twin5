import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/SideBar"; // Import your SideBar component
import Header from "../../components/Header"; // Import your Header component

const Profile = () => {
  // State for dark mode, modals, and sidebar toggle
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileInfoModal, setIsProfileInfoModal] = useState(false);
  const [isProfileAddressModal, setIsProfileAddressModal] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    country: "",
    cityState: "",
  });
  const [tempUser, setTempUser] = useState({ name: "", phone: "" }); // Temporary state for editing
  const [tempAddress, setTempAddress] = useState({ country: "", cityState: "" }); // Temporary state for editing address
  const [updateMessage, setUpdateMessage] = useState("");

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "",
        phone: userData.phone || "",
        country: userData.country || "United States", // Default value
        cityState: userData.city || "Arizona, United States", // Default value
      });
    }
  }, []);

  useEffect(() => {
    if (isProfileInfoModal) {
      setTempUser({ name: user.name, phone: user.phone }); // Initialize tempUser when modal opens
    }
  }, [isProfileInfoModal, user]);

  useEffect(() => {
    if (isProfileAddressModal) {
      setTempAddress({ country: user.country, cityState: user.cityState }); // Initialize tempAddress when modal opens
    }
  }, [isProfileAddressModal, user]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  return (
    <div className={darkMode ? "dark bg-gray-900" : ""}>
      {/* App Container */}
      <div className="app-container">
        {/* Sidebar Container */}
        <div className="sidebar-container">
          <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
        </div>

        {/* Content Container */}
        <div className="content-container">
          {/* Header */}
          <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

          {/* Main Content */}
          <main>
            <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
              {/* Breadcrumb */}
              <div>
                {/* Include breadcrumb component here */}
              </div>

              {/* Profile Section */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                  Profile
                </h3>

                {/* User Info Section */}
                <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    {/* User Avatar and Details */}
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                      <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                        <img src="./images/user/owner.jpg" alt="user" />
                      </div>
                      <div className="order-3 xl:order-2">
                        <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                          {user.name}
                        </h4>
                        <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                          <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.country}
                          </p>
                        </div>
                        <button>Edit Email</button>
                      </div>
                      {/* Social Buttons */}
                      <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
                        {/* Social media buttons */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        {/* First Name */}
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            FullName
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {user.name}
                          </p>
                        </div>
                        {/* Email Address */}
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Email address
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {user.email}
                          </p>
                        </div>
                        {/* Phone */}
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Phone Number
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {user.phone}
                          </p>
                        </div>
                        {/* Bio */}
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Role
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Edit Button */}
                    <button
                      onClick={() => setIsProfileInfoModal(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                          fill=""
                        />
                      </svg>
                      Edit
                    </button>
                  </div>
                </div>

                {/* Address Section */}
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        Address
                      </h4>
                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        {/* Country */}
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Country
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {user.country}
                          </p>
                        </div>
                        {/* City/State */}
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            City/State
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {user.cityState}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Edit Button */}
                    <button
                      onClick={() => setIsProfileAddressModal(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                          fill=""
                        />
                      </svg>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      {isProfileInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => {
                setIsProfileInfoModal(false);
                setTempUser({ name: user.name, phone: user.phone }); // Reset tempUser to original values
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Personal Information</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  // Preserve the id and update local storage only on save
                  const userData = JSON.parse(localStorage.getItem("user"));
                  const updatedUser = { ...userData, name: tempUser.name, phone: tempUser.phone };
                  localStorage.setItem("user", JSON.stringify(updatedUser));

                  // Save to database
                  const userId = userData.id; // Get the connected user's ID
                  await axios.put(
                    `http://localhost:3000/users/updateUserInfo/${userId}`,
                    { name: tempUser.name, phoneNumber: tempUser.phone },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
                      },
                    }
                  );

                  setUser({ ...user, name: tempUser.name, phone: tempUser.phone }); // Apply changes to user state
                  setUpdateMessage("Personal information edited successfully!");
                  setTimeout(() => {
                    setIsProfileInfoModal(false);
                    setUpdateMessage("");
                  }, 1000); // Close the popup after 1 second
                } catch (error) {
                  console.error("Error updating user information:", error);
                  setUpdateMessage("Failed to edit personal information.");
                }
              }}
            >
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={tempUser.name}
                  onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-md focus:border-brand-500 focus:ring focus:ring-brand-500 focus:ring-opacity-50 px-4 py-3"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={tempUser.phone}
                  onChange={(e) => setTempUser({ ...tempUser, phone: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-md focus:border-brand-500 focus:ring focus:ring-brand-500 focus:ring-opacity-50 px-4 py-3"
                />
              </div>
              {updateMessage && (
                <p className={`text-sm mt-4 ${updateMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {updateMessage}
                </p>
              )}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isProfileAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => {
                setIsProfileAddressModal(false);
                setTempAddress({ country: user.country, cityState: user.cityState }); // Reset tempAddress to original values
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Address</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  // Preserve the id and update local storage only on save
                  const userData = JSON.parse(localStorage.getItem("user"));
                  const updatedUser = { ...userData, country: tempAddress.country, cityState: tempAddress.cityState };
                  localStorage.setItem("user", JSON.stringify(updatedUser));

                  // Save to database
                  const userId = userData.id; // Get the connected user's ID
                  await axios.put(
                    `http://localhost:3000/users/updateUserAddress/${userId}`,
                    { country: tempAddress.country, cityState: tempAddress.cityState },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
                      },
                    }
                  );

                  setUser({ ...user, country: tempAddress.country, cityState: tempAddress.cityState }); // Apply changes to user state
                  setUpdateMessage("Address updated successfully!");
                  setTimeout(() => {
                    setIsProfileAddressModal(false);
                    setUpdateMessage("");
                  }, 1000); // Close the popup after 1 second
                } catch (error) {
                  console.error("Error updating address:", error);
                  setUpdateMessage("Failed to update address.");
                }
              }}
            >
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  placeholder="Enter country"
                  value={tempAddress.country}
                  onChange={(e) => setTempAddress({ ...tempAddress, country: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-md focus:border-brand-500 focus:ring focus:ring-brand-500 focus:ring-opacity-50 px-4 py-3"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">City/State</label>
                <input
                  type="text"
                  placeholder="Enter city/state"
                  value={tempAddress.cityState}
                  onChange={(e) => setTempAddress({ ...tempAddress, cityState: e.target.value })}
                  className="block w-full rounded-lg border-gray-300 shadow-md focus:border-brand-500 focus:ring focus:ring-brand-500 focus:ring-opacity-50 px-4 py-3"
                />
              </div>
              {updateMessage && (
                <p className={`text-sm mt-4 ${updateMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {updateMessage}
                </p>
              )}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
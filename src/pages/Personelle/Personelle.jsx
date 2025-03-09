import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar"; // Adjust path as needed
import Header from "../../components/Header"; // Adjust path as needed
import UserInfoModal from "./PersonelleInfo"; // Adjust path as needed

const Personelle = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const allowedRoles = ["Doctor", "Nurse", "Driver", "Chef", "worker"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

        const response = await fetch("http://localhost:3000/users/display", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        });
          
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        // Filter users based on allowed roles
        const filteredUsers = data.filter((user) => allowedRoles.includes(user.role));

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddClick = () => {
    navigate("/addpersonelle");
  };

  const handleViewClick = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/users/findBymail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1]}`
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await response.json();
      setSelectedUser(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getImageByRole = (role) => {
    switch (role) {
      case "Doctor":
        return "public/avatar/doc.png";
      case "Nurse":
        return "public/avatar/nurse.png";
      case "Driver":
        return "public/avatar/driver.png";
      case "Chef":
        return "public/avatar/chief.png";
      default:
        return "src/images/user/default.jpg";
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar-container">
        <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      </div>

      <div className="content-container">
        <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

        <div className="space-y-5 sm:space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 py-4 sm:px-6 sm:py-5 flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                List Personal
              </h3>
              <button className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600" onClick={handleAddClick}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                <table className="min-w-full table-fixed border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-5 py-3 sm:px-6 text-center w-1/4">Image</th>
                    <th className="px-5 py-3 sm:px-6 text-center w-1/4">Name</th>
                    <th className="px-5 py-3 sm:px-6 text-center w-1/4">Role</th>
                    <th className="px-5 py-3 sm:px-6 text-center w-1/4">Action</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {users.length > 0 ? (
                    users.map((user) => (
                    <tr key={user.id} className="text-center">
                        <td className="px-5 py-4 sm:px-6">
                        <div className="w-10 h-10 rounded-full overflow-hidden mx-auto">
                            <img src={getImageByRole(user.role)} alt="User" className="w-100 h-100 object-cover" />
                        </div>
                        </td>
                        <td className="px-5 py-4 sm:px-6">
                        <div className="flex flex-col items-center">
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {user.email}
                            </span>
                        </div>
                        </td>
                        <td className="px-5 py-4 sm:px-6">{user.role}</td>
                        <td className="px-5 py-4 sm:px-6">
                        <div className="flex justify-center gap-2">
                            <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                            <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                            <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600" onClick={() => handleViewClick(user.email)}>
                            <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="4" className="text-center py-4">No users found</td>
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

      {selectedUser && <UserInfoModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
};

export default Personelle;
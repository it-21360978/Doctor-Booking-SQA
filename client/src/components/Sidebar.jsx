import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserMd, FaCalendarAlt, FaClipboardList, FaSignOutAlt, FaPlus } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const active = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-100 text-blue-700"
      : "text-gray-700 hover:text-blue-600";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 flex flex-col py-6 px-4 z-20">
      <h2
        className="text-2xl font-bold text-blue-700 mb-10 cursor-pointer"
        onClick={() => navigate("/doctors")}
      >
        MedLink
      </h2>

      <nav className="flex flex-col gap-4 text-base">
        <button
          onClick={() => navigate("/doctors")}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${active("/doctors")}`}
        >
          <FaUserMd className="text-lg" />
          Doctors
        </button>

        <button
          onClick={() => navigate("/appointments")}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${active("/appointments")}`}
        >
          <FaCalendarAlt className="text-lg" />
          My Appointments
        </button>

        {role === "admin" && (
          <button
            onClick={() => navigate("/doctors/add")}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${active("/doctors/add")}`}
          >
            <FaPlus className="text-lg" />
            Add Doctor
          </button>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 text-red-600 hover:text-red-700 font-medium"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </nav>
    </aside>
  );
}

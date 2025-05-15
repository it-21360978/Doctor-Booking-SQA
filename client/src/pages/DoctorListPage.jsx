import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { fetchDoctors } from "../api/doctorApi";

export default function DoctorListPage() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
      } catch (err) {
        alert("Failed to load doctors");
      }
    };

    loadDoctors();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Available Doctors</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-1">{doc.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Specialty:</strong> {doc.specialty}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Hospital:</strong> {doc.hospital}
              </p>
              <button
                onClick={() => navigate(`/book/${doc._id}`)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

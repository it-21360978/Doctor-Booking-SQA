import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getMyAppointments } from "../api/appointmentApi";

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Error loading appointments:", err);
       // alert("❌ Failed to fetch appointments");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">My Appointments</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-600">You haven't booked any appointments yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
              >
                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                  {appt.doctorId?.name || "Unknown Doctor"}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>Specialty:</strong> {appt.doctorId?.specialty}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Hospital:</strong> {appt.doctorId?.hospital}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Date:</strong> {new Date(appt.date).toDateString()}
                </p>
                <p className="text-sm text-green-600 mt-1 font-medium">
                  Status: {appt.status || "upcoming"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

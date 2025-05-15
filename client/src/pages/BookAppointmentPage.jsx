import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { fetchDoctors } from "../api/doctorApi";
import { bookAppointment } from "../api/appointmentApi";

export default function BookAppointmentPage() {
  const { id } = useParams(); // doctorId
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");

  // Fetch doctor details
  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const docs = await fetchDoctors();
        const selectedDoc = docs.find((doc) => doc._id === id);
        setDoctor(selectedDoc);
      } catch (err) {
       alert("Failed to load doctor");
      }
    };

    loadDoctor();
  }, [id]);

    // Handle booking appointment
  const handleBooking = async () => {
    if (!date) return alert("Please select a date.");
    try {
      await bookAppointment(id, date);
      alert("Appointment booked successfully!");
      navigate("/appointments");
    } catch (err) {
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Book Appointment</h1>

        {!doctor ? (
          <p>Loading doctor info...</p>
        ) : (
          <div className="bg-white shadow-xl p-6 rounded-xl max-w-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h2>
            <p className="text-gray-600 mb-1">Specialty: {doctor.specialty}</p>
            <p className="text-gray-600 mb-4">Hospital: {doctor.hospital}</p>

            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            />

            <button
              onClick={handleBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

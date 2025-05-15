import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { addDoctor } from "../api/doctorApi";
import { addDoctorSchema } from "../validations/addDoctorSchema";

export default function AddDoctorPage() {
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    hospital: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access Denied");
      navigate("/doctors");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Validate the form using Yup
      await addDoctorSchema.validate(form, { abortEarly: false });
      setErrors({}); // Clear old errors if valid

      // Submit if validation passed
      await addDoctor(form);
      //alert("Doctor added successfully!");
      setForm({ name: "", specialty: "", hospital: "", contact: "" });
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldErrors = {};
        err.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        alert(`Failed to add doctor: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-xl p-6 max-w-xl w-full space-y-4">
          <h1 className="text-2xl font-bold text-blue-800 text-center">Add New Doctor</h1>

          <input
            name="name"
            placeholder="Doctor Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            name="specialty"
            placeholder="Specialty"
            value={form.specialty}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty}</p>}

          <input
            name="hospital"
            placeholder="Hospital"
            value={form.hospital}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.hospital && <p className="text-red-500 text-sm">{errors.hospital}</p>}

          <input
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold w-full"
          >
            Add Doctor
          </button>
        </div>
      </main>
    </div>
  );
}

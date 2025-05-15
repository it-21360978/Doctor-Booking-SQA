import React from "react";
import { Link, useNavigate } from "react-router-dom";
import doctorImg from "../assets/doctor-banner.png"; // Place your hero image here

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    navigate(token ? "/doctors" : "/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Hero Text */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-900 leading-tight mb-4">
            Book Your Doctor Appointments <br /> Anytime, Anywhere
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to <span className="font-bold text-blue-700">MedLink</span> — a smarter way to find and book medical consultations at your convenience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition duration-200"
            >
              Get Started
            </button>
            <Link
              to="/login"
              className="border border-blue-600 hover:bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-sm transition duration-200"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={doctorImg}
            alt="Doctor Illustration"
            className=" min-h-screen w-full max-w-md object-cover "
          />
        </div>
      </div>
    </div>
  );
}

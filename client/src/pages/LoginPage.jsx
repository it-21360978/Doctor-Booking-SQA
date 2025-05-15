import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorImg from "../assets/doctor-banner.png";
import { loginUser } from "../api/authApi";
import { loginSchema } from "../validations/loginSchema";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


    // Handle login
  const handleLogin = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      navigate("/doctors");
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldErrors = {};
        err.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      } else {
       // alert(" Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        {/* Image */}
        <div className="hidden md:flex items-center justify-center bg-blue-100">
          <img src={doctorImg} alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Login to Your Account</h2>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

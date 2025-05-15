import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorListPage from "./pages/DoctorListPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import AddDoctorPage from "./pages/AddDoctorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/doctors" element={<DoctorListPage />} />
        <Route path="/book/:id" element={<BookAppointmentPage />} />
        <Route path="/appointments" element={<MyAppointmentsPage />} /> 
        <Route path="/doctors/add" element={<AddDoctorPage />} />
        {/* <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/doctors" element={<DoctorListPage />} />
        <Route path="/book/:id" element={<BookAppointmentPage />} />
        <Route path="/appointments" element={<MyAppointmentsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

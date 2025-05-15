import axios from "./api";

export const bookAppointment = async (doctorId, date) => {
  const res = await axios.post("/appointments/book", { doctorId, date });
  return res.data;
};


export const getMyAppointments = async () => {
    const res = await axios.get("/appointments/my");
    return res.data;
  };
  
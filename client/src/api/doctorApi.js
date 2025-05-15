import axios from "./api";

export const fetchDoctors = async () => {
  const res = await axios.get("/doctors");
  return res.data;
};


export const addDoctor = async (doctorData) => {
  const res = await axios.post("/doctors/add", doctorData);
  return res.data;
};
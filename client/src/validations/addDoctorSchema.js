import * as Yup from "yup";

export const addDoctorSchema = Yup.object().shape({
  name: Yup.string().required("Doctor name is required"),
  specialty: Yup.string().required("Specialty is required"),
  hospital: Yup.string().required("Hospital name is required"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),
});
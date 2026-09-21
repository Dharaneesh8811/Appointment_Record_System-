import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/appointments`,
});

export const createAppointment = (appointmentData) => {
  return API.post("/", appointmentData);
};

export const getAppointments = () => {
  return API.get("/");
};

export const getAppointmentById = (id) => {
  return API.get(`/${id}`);
};

export const updateAppointment = (id, appointmentData) => {
  return API.put(`/${id}`, appointmentData);
};

export const deleteAppointment = (id) => {
  return API.delete(`/${id}`);
};

export const updateAppointmentStatus = (id, status) => {
  return API.patch(`/${id}/status`, { status });
};
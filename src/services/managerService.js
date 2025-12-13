import axios from "./axios";

export const getAllLeaves = async () => {
  const res = await axios.get("/manager/requests");
  return res.data;
};

export const updateLeave = async (id, action, managerComment) => {
  const res = await axios.put(`/manager/requests/${id}`, {
    action,
    managerComment,
  });
  return res.data;
};

export const getAllEmployees = async () => {
  const res = await axios.get("/manager/employees");
  return res.data;
};

export const getManagerCalendar = async () => {
  const res = await axios.get("/manager/leave-calendar");
  return res.data;
};

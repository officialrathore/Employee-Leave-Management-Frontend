import axios from "./axios";

export const applyLeave = async (data) => {
  const res = await axios.post("/leaves/request", data);
  return res.data;
};

export const getMyLeaves = async () => {
  const res = await axios.get("/leaves/requests");
  return res.data;
};

export const getLeaveBalance = async () => {
  const res = await axios.get("/leaves/balance");
  return res.data;
};
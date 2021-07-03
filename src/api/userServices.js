import axios from "axios";
// const baseUrl = "http://localhost:3001/api/users";
const baseUrl = "/api/users";

export const create = async (user) => {
  try {
    const res = await axios.post(baseUrl, user);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const read = async (id, token) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// update
export const update = async (id, token, data) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// delete
export const remove = async (id, token) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

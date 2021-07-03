import axios from "axios";
// const baseUrl = "http://localhost:3001/api/posts";
const baseUrl = "/api/posts";

// list
export const list = async (token) => {
  try {
    const res = await axios.get(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// create
export const create = async (post, token) => {
  try {
    const res = await axios.post(baseUrl, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// update
export const update = async (id, post, token) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}/reactions`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// update comments
export const updateComments = async (id, post, token) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}/comments`, post, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

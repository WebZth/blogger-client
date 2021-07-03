import axios from "axios";
// const baseUrl = "http://localhost:3001/auth/signin";
const baseUrl = "/auth/signin";

export const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

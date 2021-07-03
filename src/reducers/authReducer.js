import { login } from "../api/authServices";

const authReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return action.data;
    default:
      return state;
  }
};

export default authReducer;

// actions
export const getAuth = (credentials) => {
  return async (dispatch) => {
    try {
      const res = await login(credentials);
      if (res) {
        dispatch({
          type: "SET_AUTH",
          data: true,
        });
        localStorage.setItem("cachedUser", JSON.stringify(res));
      }
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const removeAuth = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_AUTH",
      data: null,
    });
    localStorage.removeItem("cachedUser");
  };
};

export const giveAuth = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_AUTH",
      data: true,
    });
  };
};

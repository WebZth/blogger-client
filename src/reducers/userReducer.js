import { read, update } from "../api/userServices";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    case "UPDATE_USER":
      return action.data;
    default:
      return state;
  }
};
export default userReducer;

// actions
export const setSessionUser = () => {
  return async (dispatch) => {
    const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));
    const { token, user: userInfo } = cachedUser;
    try {
      const user = await read(userInfo._id, token);
      dispatch({
        type: "INIT_USER",
        data: user,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const updateSessionUser = (data) => {
  return async (dispatch) => {
    const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));
    const {
      token,
      user: { _id: id },
    } = cachedUser;
    try {
      const user = await update(id, token, data);
      dispatch({
        type: "UPDATE_USER",
        data: user,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const endUserSession = () => {
  return (dispatch) => {
    dispatch({
      type: "INIT_USER",
      data: null,
    });
  };
};

import { create, list, update, updateComments } from "../api/postServices";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_POSTS":
      return action.data;
    case "ADD_POST":
      return [...state, action.data];
    case "UPDATE_POST":
      return state.map((el) => (el.id === action.data.id ? action.data : el));
    default:
      return state;
  }
};
export default postReducer;

// actions
export const populateFeed = () => {
  return async (dispatch) => {
    const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));
    const { token } = cachedUser;
    try {
      const posts = await list(token);
      dispatch({
        type: "INIT_POSTS",
        data: posts,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const addPost = (post) => {
  return async (dispatch) => {
    const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));
    const { token } = cachedUser;
    try {
      const { returnedPost } = await create(post, token);
      dispatch({
        type: "ADD_POST",
        data: returnedPost,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const updatePostReaction = (data, id) => {
  return async (dispatch) => {
    const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));
    const { token } = cachedUser;
    try {
      const post = await update(id, data, token);
      dispatch({
        type: "UPDATE_POST",
        data: post,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

export const updatePostComments = (data, id) => {
  return async (dispatch) => {
    const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));
    const { token } = cachedUser;
    try {
      const post = await updateComments(id, data, token);
      dispatch({
        type: "UPDATE_POST",
        data: post,
      });
    } catch ({ error }) {
      throw new Error(error);
    }
  };
};

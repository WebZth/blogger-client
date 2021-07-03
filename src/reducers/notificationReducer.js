const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};
export default notificationReducer;

// action
export const notify = (msg, type, seconds) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { msg, type },
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
        data: null,
      });
    }, seconds * 1000);
  };
};

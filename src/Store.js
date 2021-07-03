import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// reducers
import authReducer from "./reducers/authReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  notification: notificationReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

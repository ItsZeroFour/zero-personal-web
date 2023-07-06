import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postsReducer } from "./slices/posts";
import { projectReducer } from "./slices/projects";
import { commentReducer } from "./slices/comment";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    projects: projectReducer,
    auth: authReducer,
    comments: commentReducer,
  },
});

export default store;

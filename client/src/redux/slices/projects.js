import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const { data } = await axios.get("/projects");
    return data;
  }
);

export const fetchRemoveProject = createAsyncThunk(
  "projects/fetchRemoveProject",
  async (id) => axios.delete(`/projects/${id}`)
);

export const fetchLikeProject = createAsyncThunk(
  "projects/fetchLikeProject",
  async (id) => axios.put(`/projects/like/${id}`)
);

const initialState = {
  projects: {
    items: [],
    status: "loading",
  },
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: {
    // Get projects
    [fetchProjects.pending]: (state) => {
      state.projects.status = "loading";
    },

    [fetchProjects.fulfilled]: (state, action) => {
      state.projects.items = action.payload;
      state.projects.status = "loaded";
    },

    [fetchProjects.rejected]: (state) => {
      state.projects.items = [];
      state.projects.status = "error";
    },

    // Remove project
    [fetchRemoveProject.pending]: (state, action) => {
      state.projects.items = state.projects.items.filter(
        (obj) => obj._id !== action.payload
      );
    },
  },
});

export const projectReducer = projectsSlice.reducer;

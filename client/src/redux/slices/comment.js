import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  comments: [],
  loading: false,
};

export const fetchCreateComment = createAsyncThunk(
  "comment/fetchCreateComment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(`/comment/${postId}`, {
        postId,
        comment,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchGetPostComments = createAsyncThunk(
  "comment/fetchGetComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    // Create comment
    [fetchCreateComment.pending]: (state) => {
      state.loading = true;
    },

    [fetchCreateComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },

    [fetchCreateComment.rejected]: (state) => {
      state.loading = false;
    },

    // Get comments
    [fetchGetPostComments.pending]: (state) => {
      state.loading = true;
    },

    [fetchGetPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },

    [fetchGetPostComments.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const commentReducer = commentSlice.reducer;

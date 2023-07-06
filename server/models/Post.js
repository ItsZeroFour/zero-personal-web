import mongoose from "mongoose";

const PostModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    thematic: {
      type: String,
      required: true,
    },

    tags: {
      type: Array,
      default: [],
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  { timeseries: true }
);

export default mongoose.model("PostModel", PostModel);

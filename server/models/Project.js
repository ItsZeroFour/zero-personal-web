import mongoose from "mongoose";

const projectModel = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  text: {
    type: String,
    require: true,
  },

  githubRepoLink: {
    type: String,
    require: true,
  },

  stacks: {
    type: Array,
    default: [],
  },

  stars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default mongoose.model("projectModel", projectModel);

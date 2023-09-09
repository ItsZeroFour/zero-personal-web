import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  stars: {
    type: Number,
    required: true,
    default: 5,
  },

  image: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ReviewSchema", ReviewSchema);

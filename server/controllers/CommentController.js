import Comment from "../models/Comment_.js";
import PostModel from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const author = req.userId;
    const { comment } = req.body;

    if (!comment) return res.json({ message: "Comment cannot be empty" });

    const newComment = new Comment({ comment, author });
    await newComment.save();

    try {
      await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (err) {
      res.status(500).send({ message: "Can't create comment" });
      console.log(err);
    }

    res.json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Can't create comment",
    });
  }
};
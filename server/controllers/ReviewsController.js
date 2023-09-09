import ReviewModel from "../models/Review.js";

export const createReviews = async (req, res) => {
  try {
    const doc = new ReviewModel({
      stars: req.body.stars,
      image: req.body.image,
      text: req.body.text,
    });

    const data = await doc.save();

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to create review",
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).send({
      message: "Failed to get reviews",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    ReviewModel.findOneAndDelete({ id: reviewId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Review not found",
          });
        }

        res.json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Can't remove review",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to remove review",
    });
  }
};

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations/validation.js";
import bodyParser from "body-parser";
import multer from "multer";
import {
  UserController,
  PostController,
  ProjectController_,
  CommentController,
  ReviewsController,
} from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";

const app = express();

// Constants
const PORT = process.env.PORT || 5555;
const MONGO_URI = process.env.MONGO_URI;
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
// Register routes
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.me);

// Post routes
app.get("/posts", PostController.getAll);
app.get("/posts/::id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/::id", checkAuth, PostController.remove);
app.patch(
  "/posts/::id",
  postCreateValidation,
  checkAuth,
  PostController.update
);
app.get("/posts/comments/::id", PostController.getComments);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// Project routes
app.get("/projects", ProjectController_.getProjects);
app.get("/projects/::id", ProjectController_.getOneProject);
app.post("/projects", checkAuth, ProjectController_.createProject);
app.delete("/projects/:id", checkAuth, ProjectController_.removeProject);
app.patch("/projects/::id", checkAuth, ProjectController_.updateProject);
app.put(
  "/projects/like/:id",
  checkAuth,
  ProjectController_.increaseStarOfProject
);
app.put(
  "/projects/dislike/:id",
  checkAuth,
  ProjectController_.unincreaseStarOfProject
);

// Comments
app.post("/comment/::id", checkAuth, CommentController.createComment);

// Reviews
app.post("/reviews/create", ReviewsController.createReviews);
app.get("/reviews/getAll", ReviewsController.getReviews);
app.delete("/reviews/delete", ReviewsController.deleteReview)

// Start function
async function start() {
  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("Mongo db connection successfully"))
      .catch((err) => console.log(err));

    app.listen(PORT, (err) => {
      if (err) return console.log("app crashed", err);
      console.log(`Server started successfully! Port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();

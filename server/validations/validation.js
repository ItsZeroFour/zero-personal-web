import { body } from "express-validator";

export const registerValidation = [
  body("email", "Uncorrect email").isEmail(),
  body("password", "Password must be at least 8 characters").isLength({
    min: 8,
  }),
  body("firstName", "Type first name").isLength({ min: 3 }),
  body("lastName", "Type last name").isLength({ min: 3 }),
  body("avatarUrl", "Uncorrect link to avatar").optional(),
];

export const loginValidation = [
  body("email", "Uncorrect email").isEmail(),
  body("password", "Password must be at least 8 characters").isLength({
    min: 8,
  }),
];

export const postCreateValidation = [
  body("title", "Enter article title").isLength({ min: 3 }).isString(),
  body("text", "Enter article text").isLength({ min: 3 }).isString(),
  body("tags", "Wrong tag format (specify array)").optional().isString(),
  body("imageUrl", "Invalid link en image").optional().isString(),
];

export const projectCreateValidation = [
  body("title", "Enter project title").isLength({ min: 2 }).isString(),
  body("text", "Enter oriject text").isLength({ min: 2 }).isString(),
  body("githubRepoLink", "Invalid github repo link").isString().isURL(),
  body("stacks", "Invalid stacks list (specify objects array)").isString(),
];

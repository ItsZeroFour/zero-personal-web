import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserSchema from "../models/User.js";
import dotenv from "dotenv";

dotenv.config("./.env");

const SECRET = process.env.SECRET;

export const register = async (req, res) => {
  try {
    // Hash password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserSchema({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET,
      { expiresIn: "30d" }
    );

    // Достаем хэшированный пароль, что бы не поулчать его при регистрации
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Wrong login or password",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Wrong login or password",
      });
    }

    // Если все верно, то генерируем новый токен и получаем пользователя
    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET,
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to login",
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get user",
    });
  }
};

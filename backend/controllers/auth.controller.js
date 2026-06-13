// import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const client = neon(process.env.DATABASE_URL);

const signup = async (req, res) => {
  try {
    // console.log("Req.body", req.body);
    const { username, email, password } = req.body;

    // Check if valid inputs
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Check if email exists in DB
    // const checkIfExist = await User.findOne({ email });
    const checkIfExist =
      await client`SELECT * FROM users WHERE email = ${email}`;
    // console.log(`Check if exist`, checkIfExist);
    if (checkIfExist.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exist with the mail, try login" });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    //Create the user in the DB
    // const user = await User.create({
    //   name,
    //   email,
    //   password: hashedPass,
    //   role: "member",
    // });

    const user = await client`
        INSERT INTO users (username, email, password, role)
        VALUES ( ${username}, ${email}, ${hashedPass}, ${"member"})
        RETURNING id, username, email, role, created_at;
    `;

    //Define the JWT token
    const accessToken = jwt.sign(
      {
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
        username: user[0].username,
      },
      process.env.JWT_SECRETA,
      { expiresIn: "30m" },
    );

    const refreshToken = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role: user[0].role,
      },
      process.env.JWT_SECRETR,
      { expiresIn: "30d" },
    );

    // Storing the cookie in http-cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //Store the token in redis here rather using http-cookie

    res.status(200).json({
      accessToken,
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (err) {
    console.error("Signup failed", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    // console.log(`req.body`, req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are requied" });
    }
    const user = await client`SELECT * FROM users WHERE email = ${email}`;
    // console.log(`user:`, user[0].username);
    if (!user || user.length === 0) {
      return res
        .status(400)
        .json({ message: "User does not exist, try signup" });
    }
    const matchPass = await bcrypt.compare(password, user[0].password);
    if (!matchPass) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //Define the JWT token
    const accessToken = jwt.sign(
      {
        id: user[0].id,
        email: user[0].email,
        role: user[0].role,
        username: user[0].username,
      },
      process.env.JWT_SECRETA,
      { expiresIn: "30m" },
    );

    const refreshToken = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role: user[0].role,
      },
      process.env.JWT_SECRETR,
      { expiresIn: "30d" },
    );

    //Storing the token in http-cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //Store the token in redis here rather using http-cookie

    res.json({
      accessToken,
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (err) {
    console.error("Error in Login", err);
    res.status(500).json({ message: "Server error while login" });
  }
};

export { signup, login };

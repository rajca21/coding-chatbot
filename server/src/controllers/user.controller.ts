import { NextFunction, Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import User from '../models/User.model.js';
import { createToken } from '../utils/tokenManager.js';
import { COOKIE_NAME } from '../utils/constants.js';

// POST /api/v1/users/register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Check if User already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send('User already exists!');

    const hashedPassword = await hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    // Removing previous cookies
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    });

    // Generating JWT token & Sending Cookie
    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires: expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: 'User registered successfully!',
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while register: ' + error,
    });
  }
};

// POST /api/v1/users/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('User does not exist!');
    }

    // Comparing passwords
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send('Wrong password!');
    }

    // Removing previous cookies
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      domain: 'localhost',
      httpOnly: true,
      signed: true,
    });

    // Generating JWT token & Sending Cookie
    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires: expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: 'User logged in successfully!',
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while login: ' + error,
    });
  }
};

// GET /api/v1/users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: 'Users retrieved',
      users: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while getAllUsers: ' + error,
    });
  }
};

// GET /api/v1/users/auth-status
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send('User not registered / Token expired!');
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Permission denied!');
    }

    return res.status(200).json({
      message: 'User logged in successfully!',
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while verifyUser: ' + error,
    });
  }
};

// GET /api/v1/users/logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send('User not registered OR Token malfunctioned');
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    return res
      .status(200)
      .json({ message: 'User logged out', name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while logout: ' + error,
    });
  }
};

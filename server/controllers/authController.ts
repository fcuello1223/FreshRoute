import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../config/prisma.js";

//Generate JWT Token
const generateToken = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

//Check if user is Admin
const getAdminStatus = (email: string | null | undefined): boolean => {
  if (!email) {
    return false;
  }

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((email) => {
        return email.trim().toLowerCase();
      })
    : [];

  return adminEmails.includes(email.toLowerCase());
};

//Register
//POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    return res.status(400).json({
      message: "There already exists a user with entered E-mail address",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { name: name, email: email.toLowerCase(), password: hashedPassword },
  });

  const token = generateToken(newUser.id);

  const newUserData: any = { ...newUser };

  delete newUserData.password;

  newUserData.isAdmin = getAdminStatus(newUserData.email);

  return res.status(201).json({ user: newUserData, token: token });
};

//Login
//POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide E-mail and Password" });
  }

  const targetUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { addresses: true },
  });

  if (!targetUser) {
    return res.status(401).json({
      message: "Invalid E-mail or Password",
    });
  }

  const isMatch = await bcrypt.compare(password, targetUser.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Password'})
  }

  const token = generateToken(targetUser.id);

  const targetUserData: any = { ...targetUser };
  delete targetUserData.password;
  targetUserData.isAdmin = getAdminStatus(targetUserData.email);

  return res.status(201).json({ user: targetUserData, token: token });
};

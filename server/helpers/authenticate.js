import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRY_TIME })
}

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, 13);
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

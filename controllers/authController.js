import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createError, ERROR_MESSAGE } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            domainId: req.body.domainId,
            email: req.body.email,
            password: hash
        })

        await newUser.save();
        res.status(201).send("User has been registered.");
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({domainId: req.body.domainId});
        if( !user ) return next(createError(404, ERROR_MESSAGE.NOTFOUND));
        const isCredentialsValid = await bcrypt.compare(req.body.password, user.password);
        if(!isCredentialsValid) 
            return next(createError(400, ERROR_MESSAGE.INVALID));
        const token = jwt.sign({ id: user._id, permissions: user.permissions }, process.env.JWT_SECRET);
        const { password, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            maxAge: 30 * 60 * 1000, //30 minutes
            httpOnly: true,
        }).status(201).json({ ...otherDetails });
    } catch (error) {
        next(error)
    }
}
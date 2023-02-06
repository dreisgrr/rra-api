import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated."))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err)
            return next(createError(403, "Invalid token."))
        req.user = user;
        console.log(req.user)
        next() 
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()=> {
        console.log(req.user.id)
        console.log(req.body)
        if(req.user?.id === req.params.id || req.user?.permissions.isAdmin) {
            next()
        } else {
            return next(createError(403, "Unauthorized access."))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user?.permissions.isAdmin) {
            next()
        } else {
            return next(createError(403, "Admin access only."))
        }
    })
}
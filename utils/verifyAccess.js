import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
    console.log('verifyToken')
    const token = req.cookies.access_token;
    if(!token) {
        console.log('No token')
        req.errMessage = "Not authenticated"
        return next(createError(401, "You are not authenticated."))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //console.log(user);
        if(err) {
            req.errMessage = "Invalid token"
            console.log('Invalid token')
            return next(createError(403, "Invalid token."))
        }
        req.user = user;
        next() 
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log('verifyUser')
        // console.log(req.user?.id)
        // console.log(req.query)
        // console.log(req.errMessage)
        if(req.errMessage != null) {
            return next(createError(403, req.errMessage))
        }
        if(req.user?.id === req.query.id || req.user?.permissions.isAdmin) {
            next()
        } else {
            return next(createError(403, "Unauthorized access."))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('verifyAdmin')
        // console.log(req.errMessage)
        if(req.errMessage != null) {
            return next(createError(403, `${req.errMessage}`))
        }
        if(req.user?.permissions.isAdmin) {
            next()
        } else {
            return next(createError(403, "Admin access only."))
        }
    })
}
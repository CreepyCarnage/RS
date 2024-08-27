import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const vToken = (req, res, next) =>{
    const token = req.cookies.access_token;

    if(!token){
        return next(createError(401,"You are not authenticated"))
    }

    jwt.verify(token,process.env.JWT, (err, user) =>{
        if(err) return next (createError(403,"Invalid Token"))
            req.user = user;
        next();
    });
};

export const verifyUser = (req,res,next) =>{
    vToken(req,res,next, () => {
        if(req.user.id === req.params.id || req.user.isitAdmin){
            next();
        } else{
            return next(createError(403, "You are not authorized"));
        }
    });
};

export const vAdmin = (req,res,next) =>{
    vToken(req,res,next, () => {
        if(req.user.isitAdmin){
            next();
        } else{
            return next(createError(403, "You are not authorized"));
        }
    });
};
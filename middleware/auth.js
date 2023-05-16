//  custom middelware

import jwt from "jsonwebtoken";


export const auth = (req, res, next) =>{
    try{
        const token = res.header("x-auth-token");
        console.log(token);
        jwt.verify(token, process.env.SECRET_KEY)
        next();
    }
    catch(err){
        res.send({error: err.message})
    }
}
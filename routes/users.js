import express from 'express';
import { genPassword, createUser, getUserByName } from '../controller/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

/** signup using post method */
router.post('/signup',async (req, res,) => {
    const { username, password } = req.body;
    console.log(username, password);
    // validation 
    const isExistUser = await getUserByName(username);
    if(isExistUser){
        res.status(404).send({
            message: "Username already Taken"
        })
        return;
    }
    if( !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#!@%&]).{8,}$/g.test(password))
    {
        res.status(404).send({
            message: "Passwrod Pattern does not match"
        })
        return;
    }

    const hashPassword = await genPassword(password);
    const result = await createUser(username, hashPassword);
    res.send(result);
})

/** login using post method */
router.post('/login',async (req, res) => {
    const { username, password} = req.body;
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    if(!userFromDB)
    {
        res.status(404).send({
            message: "Invlid Credential"
        })
        return;
    };
    const storedDbPassword = userFromDB.password;
    const passwordMatch = await bcrypt.compare(password, storedDbPassword);
    if(!passwordMatch)
    {
        res.status(404).send({
            message: "Invalid Credential"
        })
        return;
    }
    const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY)
    res.send({
        message: "Successfull login ",token: token
    });
    
})

export const usersRouter = router;
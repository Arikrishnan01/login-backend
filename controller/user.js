import bcrypt from 'bcrypt';
import { client } from '../server.js';


export async function genPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    return hashPassword;
}

/** create username and password func */
export async function createUser(username, hashPassword){
    return await client
        .db("loginapp")
        .collection("users")
        .insertOne({ username: username, password: hashPassword})
}

/** check the is user is exist or not func */
export async function getUserByName(username){
    return await client
            .db("loginapp")
            .collection("users")
            .findOne({ username: username})
}

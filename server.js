import express from 'express';
import * as dotenv from 'dotenv';
import { usersRouter } from './routes/users.js';
import { MongoClient} from 'mongodb';


const app = express();

/** port config used from .env */
dotenv.config();
const PORT  = process.env.PORT;

const MONGOO_URL = process.env.MONGOO_URL;
/** mongodb connection */
async function createConnection(){
    const client = new MongoClient(MONGOO_URL);
    await client.connect();
    console.log("MONGODB CONNECTED");
    return client;
}
export const client = await createConnection();


/** middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** getting out from server in home page */
app.get('/',(req, res) => {
    res.send("Welcome to the login and forget password app")
});

/** router import an dused here */
app.use('/users', usersRouter);

/** server listen with port  */
app.listen(PORT,() => {
    console.log(`SERVER STARTED ${PORT}`);
});



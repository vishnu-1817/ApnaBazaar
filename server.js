import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoutes.js';
import productRoute from './routes/productRoute.js';


dotenv.config();

console.log("starting the app".bgBlack.yellow)
connectDB();


const app = express();

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());


// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);



app.get('/', (req, res)=>{
    console.log("get request on '/' is running fine")
    res.send("<h1>hello </h1>")
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`.bgBlue.black)
});
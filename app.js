import express from 'express';
import {PORT} from './config/env.js' ;
import connectionToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
// import { connection } from 'mongoose';

const app = express() ; 
app.use(express.json()) ; 
app.use(express.urlencoded({ extended: false })) ;
app.use(cookieParser()) ;  

app.use('/api/v1/auth' , authRouter) ; 
app.use('/api/v1/users' , userRouter) ;
app.use('/api/v1/subscriptions' , subscriptionRouter) ;

app.use(errorMiddleware) ; // Error handling middleware

app.get('/', (req, res) => {
    res.send('Hello, World!');
}) ;

app.listen(PORT, () => {
    console.log(`sub-track is running on http://localhost:${PORT}`);
    connectionToDatabase()
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });
}) ;

export default app;

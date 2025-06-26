import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signUp = async (req, res, next) => {
    // sign up logic
    // res.send({'message': 'Sign up successful!'});
    const session = await mongoose.startSession() ; 
    session.startTransaction() ;
    try {
        //logic to create a new user 
        const {name , email , password} = req.body;

        const existUser = await User.findOne({email})
        if(existUser) {
            const error = new Error('user already exits') ; 
            error.statusCode = 409 ;
            throw error ;
        }

        // hasth the password 
        const salt = await bcrypt.genSalt(10) ; 
        const hashedPassword = await bcrypt.hash(password , salt ) ; 

        // create the user 
        const newUser = await User.create([{name , email , password
: hashedPassword}], {session}) ;

        const token = jwt.sign({userId : newUser[0]._id}, process.env.JWT_SECRET, {
            expiresIn: '1d' // token will expire in 1 day
            // process.env.TOKEN_EXPIRATION // token will expire in 1 day
        })
        await session.commitTransaction() ; 
        session.endSession() ;

        res.status(201).json({
            success: true,
            message: 'Sign up successful!',
            data : {
                token , 
                user:newUser[0] ,
            }

        });

        
          
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(error);
        
    }
}

export const signIn = async (req, res, next) => {
    // sign in logic
    try {
        const {email, password} = req.body;

        // check if user exists
        const existUser = await User.findOne({email});
        if(!existUser) {
            const error = new Error('Invalid email or password') ; 
            error.statusCode = 401 ; // Unauthorized
            throw error ;
        }

        // check password if correct or not 
        const isPasswardValid = await bcrypt.compare(password , existUser.password) ; 
        if(!isPasswardValid){
            const error = new Error('Invalid email or password') ; 
            error.statusCode = 401 ; // Unauthorized
            throw error ;
        }

        const token = jwt.sign({userId : existUser._id}, process.env.JWT_SECRET, {
            expiresIn: '1d' // token will expire in 1 day
        });
        res.status(200).json({
            success: true,
            message: 'Sign in successful!',
            data: {
                token,
                user: existUser
            }
        });
        
    } catch (error) {
        next(error)  ; 
    }
}   

export const signOut = async (req, res, next) => {
    // sign out logic
}

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';

const authorise = async (req, res, next) => {
    try {
        let token ; 
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Extract token from Bearer token
        }

        if(!token) {
            return res.status(401).json({message: "Unauthorized access"});
        }
        const decoded = jwt.verify(token , JWT_SECRET); 
        const user = await User.findById(decoded.userId) ;
        if(!user){
            return res.status(401).json({message: "Unauthorized access"});
        }

        req.user = user ; 
        next();

    } catch (error) {
        res.status(401).json({message: "Unauthorized access" , error: error.message});
    }       
}


export default authorise;

import mongoose from 'mongoose';
import {DB_URI} from '../config/env.js';

if(!DB_URI) {
    throw new Error('please provide a valid DB_URI in the .env.development.local file');
}

const connectionToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI) ; 



    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default connectionToDatabase;


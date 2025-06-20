import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, 'Name is required'] , 
        trim : true , // this will remove any leading or trailing spaces
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [50, 'Name must be at most 50 characters long']
    },
    email :{
        type : String,
        required: [true, 'Email is required'],
        unique: true, 
        trim: true, // this will remove any leading or trailing spaces
        lowercase: true, // this will convert the email to lowercase
        minLength: [5, 'Email must be at least 5 characters long'],
        maxLength: [100, 'Email must be at most 100 characters long'] ,
        match : ['^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$', 'Please provide a valid email address']
    } , 
    password : {
        type : String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long']
        // maxLength: [1024, 'Password must be at most 1024 characters long']
    }

    
    
} ,{
    timestamps: true // this will add createdAt and updatedAt fields
}) ; 


const User = mongoose.model('User', userSchema);
export default User;

// {name : 'John Doe', email: johndoe@mail.com , password: '123456'} ;

import { Router } from "express";
import { getUser , getUsers } from "../controllers/user.controller.js";
import  authorise  from "../middlewares/auth.middleware.js";

const userRouter = Router() ; 

userRouter.get('/' , getUsers);
 
userRouter.get('/:id' ,authorise,getUser);

userRouter.post('/' , (req, res) => {
    res.send({message : 'Create a new user'});
}); 
userRouter.put('/:id' , (req, res) => {
    res.send({message : `Update user with ID: ${req.params.id}`});
}); 
userRouter.delete('/:id' , (req, res) => {
    res.send({message : `Delete user with ID: ${req.params.id}`});
});


export default userRouter; 

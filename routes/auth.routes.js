import {Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up' , (req, res) => {
    res.send({message : 'Sign Up Endpoint'});
});

authRouter.post('/sign-in' , (req, res) => {
    res.send({message : 'Sign In Endpoint'});
});


authRouter.post('/sign-out' , (req, res) => {
    res.send({message : 'Sign Out Endpoint'});
});

export default authRouter ;

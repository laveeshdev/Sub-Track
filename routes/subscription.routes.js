import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({ message: 'Get all subscriptions' });
}); 
subscriptionRouter.get('/:id', (req, res) => {
    res.send({ message: 'Get all subscriptions' });
}); 

subscriptionRouter.post('/', (req, res) => {
    res.send({ message: 'Create a subscription' });
}); 
subscriptionRouter.put('/:id', (req, res) => {
    res.send({ message: 'Update a subscription' });
}); 
subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ message: 'Delete subscription' });
}); 

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ message: 'Get all users subscriptions' });
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ message: 'cancel  subscriptions' });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({ message: ' all upcomings subscriptions' });
});



export default subscriptionRouter;

import {registerController,loginController} from '../controller/User.js'
import {requireSignIn, isAdmin} from '../middlewares/Auth.js'

import express from "express";
const app = express.Router();

app.post('/register',registerController);
app.post("/login",loginController);

// protected routes for user 
app.get('/user-auth',requireSignIn, (request, response)=>{
    response.status(200).send({ ok : true});
})

app.get('/admin-auth', requireSignIn, isAdmin, (request, response)=>{
    response.status(200).send({ ok : true});
})


export default app;

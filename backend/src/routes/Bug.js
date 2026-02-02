import express from "express" 
import {bugPostController} from "../controller/Bug.js"
import { requireSignIn } from "../middlewares/Auth.js";

const app = express.Router();
app.use(express.json());
app.post("/report-bug",requireSignIn,bugPostController);

export default app;
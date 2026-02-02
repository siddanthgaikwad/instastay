import express from "express";
import { 
    createCategoryController, 
    deleteCategoryController, 
    getAllCategoryController, 
    updateCategoryController,
    singleCategoryController 
} 
from "../controller/Category.js";


const app = express.Router();

app.post('/create-category', createCategoryController);
app.get("/get-category", getAllCategoryController);
app.put("/update-category/:id", updateCategoryController);
app.delete("/delete-category/:id",deleteCategoryController);
app.get("/single-category/:slug",singleCategoryController);


export default app;
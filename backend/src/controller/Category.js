import slugify from "slugify";
import CategoryModel from "../models/Category.js";
import slug from "slugify";
import PostModel from "../models/Post.js"


export const createCategoryController = async (request, response) => {
    try{
        const {name} = request.body;
        if(!name){
            return response.status(400).json({
                message : "Name is required",
            });
        }

        const existingCategory = await CategoryModel.findOne({name});
        if(existingCategory){
            return response.status(400).json({
                message : "Category already exists",
            });
        }

        const newCategory = await new CategoryModel({
            name ,
            slug : slug(name),
        }).save();

        return response.status(200).send({
            success : true,
            message : "Category has been Created",
            newCategory
        })

    }
    catch(error){
        // console.log(error);
        return response.status(500).send({
            success : false,
            message : "Error while creating category",
            error,
        });
    }
}

export const getAllCategoryController = async (request, response) =>{
    try{
        const categories = await CategoryModel.find({});
        return response.status(200).send({
            success : true,
            message: "Categories fetched successfully",
            categories,
        });
    }
    catch(error){
        // console.log(error);
        return response.status(500).send({
            success: false,
            message: "Error while fetching categories",
            error,
        })
    }
}

export const updateCategoryController = async (request, response)=>{
    try{
        const {name} = request.body;
    const {id} = request.params;

    const category = await CategoryModel.findByIdAndUpdate(
        id,
        {name, slug: slugify(name)},
        {new: true}
    )
    return response.status(200).send({
        success : true,
        message: "Category updated successfully",
        category
    })
    }
    catch(error){
        // console.log(error);
        return response.send(500).send({
            success : false,
            message : "Error while updating Category",
            error,
        })
    }
}

export const deleteCategoryController = async (request, response)=>{
    try{
        const {id} = request.params;
        await CategoryModel.findByIdAndDelete(id);
        return response.status(200).send({
            success : true,
            message : "Category deleted.",
        })
    }
    catch(error){
        // console.log(error);
        return response.status(500).send({
            success : false,
            message : "Error while deleting the category",
            error,
        })
    }
}

export const singleCategoryController = async (request, response)=>{
    try{
        const {slug} = request.params;
        const category = await CategoryModel.findOne({slug});
        const post = await PostModel.find({category}).populate("category")
        return response.status(200).send({
            success : true,
            message : "Category fetched successfully",
            category,
            post,
        })

    }
    catch(error){
        // console.log(error);
        return response.status(404).send({
            succcess : false,
            message : "Category not found",
            error,
        })
    }   
}
import cloudinary from "../config/Cloudinary.js";
import Post from "../models/Post.js";
import slug from "slugify";

export const createPostController = async (request, response) => {
  try {
    // User Input
    const {
      title,
      hotelLocation,
      description,
      category,
      //   images,
      isAvailable,
      guest,
      price,
      nearArea,
      facilities,
    } = request.body;

    const files = request.files?.images;
    // console.log("Files", files);

    // Validation
    if (
      !title ||
      !hotelLocation ||
      !description ||
      !category ||
      !nearArea ||
      !facilities
    ) {
      return response.status(400).json({
        message: "All fields are required",
      });
    }

    if (isAvailable === undefined || guest == null || price == null) {
      return response.status(400).json({
        message: "Provide correct values.",
      });
    }

    if (guest == null || price == null || isAvailable == null) {
      return response.status(400).json({
        message: "Guest, price, and availability are required",
      });
    }

    if (!files || files.length < 3) {
      return response.status(400).json({
        message: "You must provide 3 images",
      });
    }

    const imageUrls = [];
    try{
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "hotels",
        });
        imageUrls.push(result.secure_url);
      }
    }
    catch(error){
      // console.log("Cloudinary error : ",error);
      response.status(500).send({
        success : false,
        message: "Error  uploading files",
        error,
      })
    }

    const newPost = new Post({
      title,
      hotelLocation,
      description,
      category,
      images: imageUrls,
      isAvailable,
      guest: Number(guest),
      price: Number(price),
      nearArea,
      facilities,
      slug: slug(title, { lower: true }),
    });

    await newPost.save();

    return response.status(201).json({
      message: "Successfully created Post",
      post: newPost,
    });
  } catch (error) {
    // console.error("CreatePost Error:", error);
    return response.status(500).json({
      message: "Something went wrong",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getPostController = async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug })
      .select("-photo")
      .populate("category");
    return response.status(200).send({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    // console.log(error);
    return response.status(500).send({
      success: false,
      message: "Error while getting post",
      error,
    });
  }
};

export const getAllPostsController = async (request, response) => {
  try {
    const posts = await Post.find({});
    return response.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    // console.log(error);
    return response.status(500).send({
      success: false,
      message: "Error while getting all posts",
      error,
    });
  }
};

export const updatePostController = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      title,
      hotelLocation,
      description,
      facilities,
      nearArea,
      category,
      guest,
      isAvailable,
      price,
    } = request.body;

    const files = request.files?.images;
    // Find the existing post
    const post = await Post.findById(id);

    if (!post) {
      return response.status(404).json({
        message: "Post not found",
      });
    }

    // Validate the fields
    if (
      !title &&
      !hotelLocation &&
      !description &&
      !facilities &&
      !nearArea &&
      !category &&
      !guest &&
      !isAvailable === null &&
      !price &&
      !files
    ) {
      response.status(400).json({
        message: "No fields provided to update.",
      });
    }

    // handle image update
    let uploadImage = post.images;
    if(files && files.length===3){
        // Delete the old images
        await Promise.all(
            post.images.map((url)=>{
                const publicId = url.split("/").pop().split(".")[0];
                return cloudinary.uploader.destroy(publicId);
            })
        );

        uploadImage = await Promise.all(
            files.map((url)=>
                cloudinary.uploader
                .upload(file.tempFilePath)
                .then((result)=>result.secure_url)
            )
        );
    }
    else if(files && files.length!==3){
        return response.status(400).json({
            message : "Please upload exactly 3 images."
        });
    }

    // update the post
    const updatePost = await Post.findByIdAndUpdate(id,{
        ...(title && {title}),
        ...(hotelLocation && {hotelLocation}),
        ...(description && {description}),
        ...(facilities && {facilities}),
        ...(nearArea && {nearArea}),
        ...(category && {category}),
        ...(isAvailable !== undefined && {isAvailable}),
        ...(guest !== 0 && {guest}),
        ...(price !== 0 && {price}),
        ...(files && {images : uploadImage}),
        ...(title && {slug: slug(title, {lower : true})}),
    });
    await updatePost.save();
    return response.status(200).send({
        success : true,
        message : "Post updated successfully",
        updatePost
    });

  } catch (error) {
    // console.log(error);
    return response.status(500).send({
      success: false,
      message: "Error while updating post",
      error,
    });
  }
};

export const deletePostController = async (request,response)=>{
    try{
        // const post = await Post.findOne({});
        await Post.findByIdAndDelete(request.params.id);
        return response.status(200).send({
            success : true,
            message : "Post deleted successfully",
        });
    }
    catch(error){
        // console.log(error);
        return response.status(500).send({
            success : false,
            message : "Error while deleting the post",
            error
        })
    }
};

export const getRelatedPostController = async (request, response)=>{
  try{
    const {pid, cid} = request.params;
    const relatedPost = await Post.find({
      category: cid,
      _id : {$ne : pid},
    })
      .select("-photo")
      .limit(2)
      .populate("category");
      
      return response.status(200).send({
        success : true,
        message: "Related posts fetched successfully",
        relatedPost,
      })
    
  }
  catch(error){
    return response.status(500).send({
      success : false,
      message: "Error while fetching Related posts",
      error,
    })
  }
};

export const searchProductController  = async (request, response)=> {
  try{
    const {keyword} = request.params;
    const words = keyword.split(" ");
    const regexString = words.join("|");
    const results = await Post.find({
      $or: [
        {title: {$regex: keyword, $options: "i"}},
        {
          description: {
            $regex: regexString,
            $options: "i",
          },
        },
      ],
    })
      .select("title hotelLocation images description slug")
    response.json(results);
  }
  catch(error){
    return response.status(500).send({
      success : false,
      message: "Unable to Search",
      error,
    })
  }
};



import express from 'express';
import { createPostController,
    getPostController,
    getAllPostsController,
    updatePostController,
    deletePostController,
    getRelatedPostController,
    searchProductController
} from '../controller/Post.js';

const routes = express.Router();

routes.post('/create-post', createPostController)
routes.get("/get-post/:slug",getPostController);
routes.get("/get-all-posts",getAllPostsController);
routes.put("/update-post/:id",updatePostController);
routes.delete("/delete-post/:id",deletePostController);
routes.get('/related-post/:pid/:cid',getRelatedPostController) //based on product id and category id
routes.get("/search/:keyword",searchProductController);
// Router.get("/");

export default routes;
import express from "express";
import { CreatePostRequest } from "../models/api/createPostRequest";
import {
  createPost,
  dislikePost,
  getPageOfPosts,
  likePost,
} from "../services/postService";
import { body, validationResult } from "express-validator";
import { format } from "date-fns";

const router = express.Router();

router.get("/", async (request, response) => {
  const page = request.query.page ? parseInt(request.query.page as string) : 1;
  const pageSize = request.query.pageSize
    ? parseInt(request.query.pageSize as string)
    : 9;

  const postList = await getPageOfPosts(page, pageSize);

  const totalPosts = postList.total;

  return response.render("post_list", {
    postList: postList,
    format: format,
    morePosts: await getPageOfPosts(page, pageSize + 9), 
    // currentPage: page,
    // hasNextPage: totalPosts > page * pageSize,
    // hasPreviousPage: page > 1,
    // nextPage: page + 1,
    // previousPage: page - 1,
  });
});

router.get("/create/", async (request, response) => {
  return response.render("create_post");
});

router.post(
  "/create/",
  body("message").notEmpty(),
  body("imageUrl").notEmpty(),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const post = request.body;

    await createPost(post as CreatePostRequest);
    return response.redirect("/posts/");
  }
);

router.post("/:postId/like/", async (request, response) => {
  const userId = 1; // For now, just assume that we are user 1
  const postId = parseInt(request.params.postId);
  const returnUrl = request.params?.returnUrl;

  await likePost(userId, postId);
  response.redirect(returnUrl || "/posts/");
});

router.post("/:postId/dislike/", async (request, response) => {
  const userId = 1; // For now, just assume that we are user 1
  const postId = parseInt(request.params.postId);
  const returnUrl = request.params?.returnUrl;

  await dislikePost(userId, postId);
  response.redirect(returnUrl || "/posts/");
});

export default router;

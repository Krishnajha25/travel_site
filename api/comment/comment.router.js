const commentRouter = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    createComment,
    getComments,
    getCommentById,
    getCommentByPlaceName,
    deleteComment
} = require("./comment.controller");

commentRouter.get("/", checkToken, getComments);
commentRouter.post("/", checkToken, createComment);
commentRouter.get("/:id", checkToken, getCommentById);
commentRouter.get("/place/:placeName", checkToken, getCommentByPlaceName);
commentRouter.delete("/:id", checkToken, deleteComment);

module.exports = commentRouter;

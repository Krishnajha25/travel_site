const {
  createComment,
  getComment,
  getCommentById,
  getCommentByPlaceName,
  deleteComment
} = require("./comment.service");

    //============Comment Controller=============
module.exports = {
    createComment: (req, res) => {
      const body = req.body
      createComment(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
  
    getComments: (req, res) => {
      getComment((err, result) => {
        if(err){
          return res.json({
            success: 0,
            message: err
          })
        }
        return res.status(200).json({
          success: 1,
          message: result
        })
      })
    },
  
    getCommentById: (req, res) => {
      const id = req.params.id
      getCommentById(id, (err, result) => {
        if(err){
          return res.json({
            success: 0,
            message: err
          })
        }
        if(!result){
          return res.json({
            success: 0,
            message: "No comment exist by id " + id
          })
        }
        return res.status(200).json({
          success: 1,
          message: result
        })
      })
    },
  
    getCommentByPlaceName: (req, res) => {
      const placeName = req.params.placeName
      getCommentByPlaceName(placeName, (err, result) => {
        if(err){
          return res.json({
            success: 0,
            message: err
          })
        }
        if(result.length < 1){
          return res.json({
            success: 0,
            message: "No comments for the place "+placeName
          })
        }
        return res.status(200).json({
          success: 1,
          message: result
        })
      })
    },
  
    deleteComment: (req, res) => {
      const id = req.params.id
      deleteComment(id, (err, result) => {
        if(err){
          return res.json({
            success: 0,
            message: err
          })
        }
        if (result < 1) {
          return res.json({
            success: 0,
            message: "Could not delete",
          });
        }
        return res.status(200).json({
          success: 1,
          message: "Comment with id "+id+ " deleted successfully!"
        })
      })
    }
};
  
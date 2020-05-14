const pool = require("../../config/database");

module.exports = {

//===============Comment system services=================

  createComment: (data, callBack) => {
    pool.query(
      `insert into comments(userId, placeName, feedback) 
                values(?,?,?)`,
      [
        data.userId,
        data.placeName,
        data.feedback
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getComment: callBack => {
    pool.query(
      `select comments.id, comments.userId, registration.firstName, registration.lastName, comments.feedback, comments.commentOn from comments INNER join registration where comments.userId = registration.id`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCommentByPlaceName: (placeName, callBack) => {
    pool.query(
      `select comments.userId, registration.firstName, registration.lastName, comments.feedback, comments.commentOn from comments INNER join registration where comments.userId = registration.id and comments.placeName = ?`,
      [placeName],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCommentById: (id, callBack) => {
    pool.query(
      `select * from comments where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteComment: (id, callBack) => {
    pool.query(
      `delete from comments where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  }
};

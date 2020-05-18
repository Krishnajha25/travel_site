const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, email, password) 
                values(?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.password
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select id, firstName, lastName, email, password, signUpDate, permission from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,lastName,email, signUpDate from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select id,firstName,lastName,email, signUpDate from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, email=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateUserPassword: (email, password, callBack) => {
    pool.query(
      `update registration set password=? where email = ?`,
      [password, email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log()
        return callBack(null, results.affectedRows);
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log("Results => ",results.affectedRows)
        return callBack(null, results.affectedRows);
      }
    );
  },

  removeToken: (email, callBack) => {
    pool.query(
      `update registration set resetToken = null, tokenExpiry = null where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log("Results => ",results.affectedRows)
        return callBack(null, results.affectedRows);
      }
    );
  }
  

};

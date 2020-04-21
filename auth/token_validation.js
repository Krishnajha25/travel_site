const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("Authorization");
    if (token) {
      // Remove Bearer from string
      token = token.split(" ");
      token = token[1];
      jwt.verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.status(401).send("Some problem occured please login again.")
          //return console.log(token + err)
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).send("Access Denied! Unauthorized User")
      //console.log("Access denied")
    }
  }
};

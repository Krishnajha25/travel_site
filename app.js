require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
var path = require('path')
var cors = require("cors")
var bodyParser = require("body-parser")
const { checkToken } = require('./auth/token_validation')

const xlsxFile = require("read-excel-file/node")

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.get('/api/file', (req, res) => {
  xlsxFile('./RECORD.xlsx').then((rows) => 
    {
      res.json(rows)
    }
  )
})

app.get('/api/file/:name', (req, res) => {
  const name = req.params.name
  xlsxFile('./RECORD.xlsx').then((rows) => 
    {
      for (let i = 0; i < rows.length; i++) {
        if(rows[i][0] === name){
          return res.json(rows[i])
        }
      }
    }
  )
})


app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/users", userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});

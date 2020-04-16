require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
var path = require('path')
var cors = require("cors")
var bodyParser = require("body-parser")
const { checkToken } = require('./auth/token_validation')

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/users", userRouter);

// app.use("/api/places", (req, res) =>{

// })

app.use("/api/places", (req, res) => {
  let places = [
    {
      "_id": "1",
      "imageSource": "https://www.thegreatnext.com/uploads/category/trekkinginlonavala_1.jpg",
      "name": "Lonavala",
      "desc": "Loren ipsum. Lorem ipsum"
    },
    {
      "_id": "2",
      "imageSource": "https://cdn1.goibibo.com/t_tg_fs/mahabaleshwar-pratapgarh-fort-150117237847-orijgp.jpg",
      "name": "Mahabaleshwar",
      "desc": "Loren ipsum. Lorem ipsum"
    },
    {
      "_id": "3",
      "imageSource": "https://static.trip101.com/paragraph_media/pictures/001/725/966/large/Mysore_Palace__India_%28photo_-_Jim_Ankan_Deka%29.jpg?1570587794",
      "name": "Mysuru",
      "desc": "Loren ipsum. Lorem ipsum"
    },
    {
      "_id": "4",
      "imageSource": "https://www.onacheaptrip.com/wp-content/uploads/Kailasa-Temple-at-Ellora-Caves-Aurangabad.jpg",
      "name": "Ajanta Elora",
      "desc": "Loren ipsum. Lorem ipsum"
    },
    {
      "_id": "5",
      "imageSource": "https://www.holidify.com/images/cmsuploads/compressed/5621259188_e74d63cb05_b_20180302140149.jpg",
      "name": "India Gate",
      "desc": "Loren ipsum. Lorem ipsum"
    },
    {
      "_id": "6",
      "imageSource": "https://lp-cms-production.imgix.net/2019-06/9579893.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
      "name": "Darjeeling",
      "desc": "Loren ipsum. Lorem ipsum"
    }
]
  res.json(places)
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});

const express =  require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/auth",require('./src/routes/user.routes'));

app.get("/", (req, res) =>{
    res.render("index")
})

//Esta constante se recibe en index.js
module.exports = app;
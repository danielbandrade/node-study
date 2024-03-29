const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const attendenceRoute = require("./routes/attendenceRoute");
const userRoute = require("./routes/userRoute");
const memberRoute = require("./routes/memberRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 5000;

// Minddlewares
app.use(express. json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.urlencoded({
    extended: true
}));


// Routes Middlewares

app.use("/api/users", userRoute);
app.use("/api/members", memberRoute);
app.use("/api/attendences", attendenceRoute);


// ROUTES
app.get("/", (req,res) => {
    res.send("Home Page");
})


// error Middleware
app.use(errorHandler);

// Conect to DB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { 
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`) 
        })
    })
    .catch((err) => console.log(err))
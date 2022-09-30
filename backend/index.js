require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { json } = require("express");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.json("server running");
})
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8081;
app.listen(port, console.log(`Listening on port ${port}...`));

























const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
// const router = express.Router();

app.use(cors());
//Db connection
connectDB();
//Init Middleware
app.use(express.json({ extented: false }));
app.get("/", (req, res) => {
  res.send("API Running");
});

//routes
app.use("/api/users", require("./api/users"));
app.use("/api/auth", require("./api/auth"));
app.use("/api/subject", require("./api/subject"));
// app.use("/api/addstudent", require("./api/addstudent"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

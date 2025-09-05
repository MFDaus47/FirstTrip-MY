const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db.config");
const testRoute = require("./routes/test");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/test", testRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});

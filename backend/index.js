const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const testRoute = require("./routes/test");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/test", testRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log("Server running on port ${PORT"));
  })
  .catch((err) => console.error(err));

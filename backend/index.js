const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db.config");
const testRoute = require("./routes/test");
const errorHandler = require("./middlewares/error.middleware");
const logger = require("./middlewares/logger.middleware");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/test", testRoute);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info("Server is running on port ${PORT}");
});

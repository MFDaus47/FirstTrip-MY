const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

router.post("/trips/estimate", (req, res) => {
  res.json({ message: "This is the estimation" });
});

module.exports = router;

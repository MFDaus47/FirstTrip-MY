const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

router.post("/trips/estimate", (req, res) => {
  res.json({
    origin: req.body.origin,
    destination: req.body.destination,
    transport_mode: req.body.transport_mode,
    estimated_cost: 100,
  });
});

module.exports = router;

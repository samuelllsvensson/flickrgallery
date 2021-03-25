import express from "express";
import { makeAPICall } from "../api.js";

const router = express.Router();

// API Endpoint which performs an async call to makeAPICall using data from client.
router.get("/gallery", async (req, res) => {
  // Convert string to bool
  var radiusBool = req.query.radiusSearch === "true";
  let data = {
    text: req.query.search,
    resultsCount: req.query.results,
    isRadiusSearch: radiusBool,
  };

  try {
    const response = await makeAPICall(data);
    res.status(200).send(response.data);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
});

export default router;

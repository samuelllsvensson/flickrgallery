import cors from "cors";
import express from "express";
import path from "path";
import { makeAPICall } from "./api.js";

const __dirname = path.resolve();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());

app.get("/gallery", async (req, res) => {
  // Convert string to bool
  var radiusBool = req.query.radiusSearch === "true";
  let data = {
    text: req.query.search,
    resultsCount: req.query.per_page,
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

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});

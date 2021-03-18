import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { makeAPICall } from "./server/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());

app.get("/home/:query?/:noResults", async (req, res) => {
  var query = req.params.query;
  var resultsCount = req.params.noResults;

  try {
    const response = await makeAPICall(query, resultsCount);
    res.status(200).send(response.data);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server running at http://" + host + ":" + port);
});

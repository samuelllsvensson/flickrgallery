import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { makeAPICall } from "./server/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
//app.set("view engine", "html");
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());

app.get("/home/:query?/:noResults", async (req, res) => {
  var query = req.params.query;
  var test = req.query;
  var resultsCount = req.params.noResults;
  console.log("test is " + test);

  console.log("query is " + query);
  //let key = "8f5d31429770a0ad19c498d286c467bd";

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

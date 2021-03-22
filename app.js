import cors from "cors";
import express from "express";
import path from "path";
import routes from "./server/routes/index";

const __dirname = path.resolve();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});

export default app;

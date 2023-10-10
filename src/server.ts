import cors from "cors";
import express from "express";
import { readdirSync } from "fs";
import { sayHelloController } from "./controllers/greeting.controller";
import { connectionSource } from "./database/data-source";
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
const router = require("./routes/image-upload.route");
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

connectionSource
  .initialize()
  .then(async () => {
    console.log("Database Connected");
  })
  .catch(error => console.log(error));

// middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve all routes dynamically using readdirsync
readdirSync("./src/routes").map(path => app.use("/api", require(`./routes/${path}`)));
app.get("/", sayHelloController);

const port = process.env.PORT || 8008;

app.listen(port, () => {
  // console.log(entities);
  console.log(`Server is running on port ${port}`);
});

import { connectionSource } from "./database/data-source";
import express from "express";
import * as entities from "./database/entity/model";
import { readdirSync } from "fs";
import { sayHelloController } from "./controllers/greeting.controller";
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
import greetingRoute from "./routes/greeting.route";
import { readdirSync } from "fs";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

connectionSource
  .initialize()
  .then(async () => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error));

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve all routes dynamically using readdirsync
readdirSync("./src/routes").map((path) =>
  app.use("/api", require(`./routes/${path}`))
);

app.get("/", sayHelloController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // console.log(entities);
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

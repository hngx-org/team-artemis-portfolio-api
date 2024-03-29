import { connectionSource } from "./database/data-source";
import express from "express";
import * as entities from "./database/entities";
import { readdirSync } from "fs";
import { sayHelloController } from "./controllers/greeting.controller";
import cors from "cors";
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
import { errorHandler } from "./middlewares/index";

const app = express();

//  Swagger UI
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
app.use(cors());

//serve all routes dynamically using readdirsync
readdirSync("./src/routes").map((path) =>
  app.use("/api/v1", require(`./routes/${path}`))
);
app.get("/", sayHelloController);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

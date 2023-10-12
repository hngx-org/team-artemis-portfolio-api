import { connectionSource } from "./database/data-source";
import express from "express";
import * as entities from "./database/entity/model";
import { readdirSync } from "fs";
import { sayHelloController } from "./controllers/greeting.controller";
import cors from "cors";
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
const router = require("./routes/image-upload.route");
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
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use()

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

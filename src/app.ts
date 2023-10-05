import express from "express";
import bodyParser from "body-parser";

// user defined imports
import greetingRoute from "./routes/greeting.route";

const app = express();

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route setup
app.use("/", greetingRoute);

export default app;

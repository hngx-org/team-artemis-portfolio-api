import { AppDataSource } from "./data-source";
import express from "express";
import greetingRoute from "./routes/greeting.route";
import { workExperienceRoutes } from "./routes/work-experience.route";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // middleware setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // route setup
    app.use("/", greetingRoute);
    app.use("/api", workExperienceRoutes);

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Connected to database");
  })
  .catch((error) => console.log(error));

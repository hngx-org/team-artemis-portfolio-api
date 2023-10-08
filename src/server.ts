import { connectionSource } from "./database/data-source";
import express from "express";
import greetingRoute from "./routes/greeting.route";
import profileRoute from "./routes/profile.route";
import contactRoute from "./routes/contact.route";

const app = express();

connectionSource
  .initialize()
  .then(async () => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error));

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route setup
app.use("/", greetingRoute);
app.use("/profile", profileRoute);
app.use("/api", contactRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

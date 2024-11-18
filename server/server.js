import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import getUsersRoute from "./routes/getUsersRoute.js";
import getTrainersRoute from "./routes/getTrainersRoute.js";
import subPlansRoute from "./routes/plansRoute.js";
import contactRoute from "./routes/ContactRoute.js";
import faqRoute from "./routes/faqRoute.js";
import getTeamDetailsRoute from "./routes/getTeamDetailsRoute.js";
import addWorkOut from "./routes/addWorkOutRoute.js";
import getAllExercises from "./routes/allExercisesRoute.js";
import statistics from "./routes/statisticRoute.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/trainers", express.static(path.join(__dirname, "trainers")));
app.use("/Team", express.static(path.join(__dirname, "Team")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/", getTrainersRoute);
app.use("/", subPlansRoute);
app.use("/", contactRoute);
app.use("/getTeamDetailsRoute", getTeamDetailsRoute);

app.use("/faqRoute", faqRoute);
app.use("/", getUsersRoute);
app.use("/addWorkout", addWorkOut);
app.use("/profile", getAllExercises);
app.use("/statistics", statistics);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

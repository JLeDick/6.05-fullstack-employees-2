import express from "express";
import employeeRouter from "#api/employees";
const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", employeeRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong! Oh no!");
});

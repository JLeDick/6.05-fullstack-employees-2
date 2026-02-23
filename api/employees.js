import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();

router.get("/", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

router.post("/", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.birthday || !req.body.salary) {
    return res.status(400).send({ error: "Missing required field" });
  }

  const employee = await createEmployee(req.body);
  res.status(201).send(employee);
});

router.get("/:id", async (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).send({ error: "ID must be an integer" });
  }
  const id = Number(req.params.id);

  const employee = await getEmployee(id);

  if (!employee) {
    return res.status(404).send({ error: "Employee not found " });
  }

  res.send(employee);
});

router.put("/:id", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.birthday || !req.body.salary) {
    return res.status(400).send({ error: "Missing required field" });
  }

  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).send({ error: "ID must be an integer " });
  }
  const id = Number(req.params.id);

  const employee = await updateEmployee({ id, ...req.body });

  if (!employee) {
    return res.status(404).send({ error: "Employee not found " });
  }

  res.status(200).send(employee);
});

router.delete("/:id", async (req, res) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(400).send({ error: "ID must be an integer " });
  }
  const id = Number(req.params.id);

  const employee = await deleteEmployee(id);

  if (!employee) {
    return res.status(404).send({ error: "Employee not found " });
  }

  res.status(204).send();
});

export default router;

/* 
The purpose of the middleware is to;
- Orgnize related routes into separate files/modules instead of one giant server.js
- It IS middleware - A router is just a special middleware that only handles requests matching it's mounted path (e.g. everythign under users)
- Has it's own middleware chain- you can attach middleware to a router tha only applies to its routes, not the whole app
- Mounts at a path prefix - app.use("/users", usersRouter) means every route inside that router is relative to /users

Mental model:

Think of it like 'departments in a restaurant'
instead of one person handling every order, the pasta station handles pasta
the grill station handles grilling
The router directs requests to the right station
*/

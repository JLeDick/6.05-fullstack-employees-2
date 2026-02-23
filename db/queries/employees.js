import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  try {
    const {
      rows: [createdEmployee],
    } = await db.query(
      `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [name, birthday, salary],
    );
    return createdEmployee;
  } catch (error) {
    console.log("Error Creating Employee", error);
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  try {
    const { rows } = await db.query(`SELECT * FROM employees`);
    return rows;
  } catch (error) {
    console.log("Error getting employees", error);
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  if (!id) return undefined;
  try {
    const {
      rows: [employee],
    } = await db.query(
      `
      SELECT * FROM employees
      WHERE id = $1
      `,
      [id],
    );
    return employee;
  } catch (error) {
    console.log("Error getting employee via ID", error);
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  if (!id) return undefined;
  try {
    const {
      rows: [employee],
    } = await db.query(
      `
      UPDATE employees
      SET name = $2, birthday = $3, salary = $4
      WHERE id = $1
      RETURNING *
      `,
      [id, name, birthday, salary],
    );
    return employee;
  } catch (error) {
    console.log("Error updating employee", error);
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  if (!id) return undefined;
  try {
    const {
      rows: [employee],
    } = await db.query(
      `
      DELETE FROM employees
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    return employee;
  } catch (error) {
    console.log("Error deleting employee", error);
  }
}

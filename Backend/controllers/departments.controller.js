const { execQuery } = require("./functions");

/**
 * Get all departments data
 * Returns:
 *  status: 200
 *  Object: [department]
 *
 */
exports.get_all = async (req, res, next) => {
  console.log("[departments/get_all]: getting departments data: ");
  let qry = await execQuery("SELECT * FROM `departments`;", []);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};

/**
 * Get a specific department data
 * Precondition:
 *  department id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 200
 *  Object: department
 *
 */
exports.get_one = async (req, res, next) => {
  let qry = await execQuery("SELECT * FROM `departments` WHERE id = ?;", [
    req.params.id,
  ]);
  if (qry.error) return next(qry.error);
  if (qry.results.length == 0)
    return res.status(404).send({ message: "department not found" });

  return res.status(200).send(qry.results[0]);
};

/**
 * Add a department to the database.
 * Request body should contain: name, dapartment id
 *
 *
 * Returns:
 *  status 201
 *  {message: message}
 *
 */

exports.create = async (req, res, next) => {
  if (!req.body.name) {
    return res
      .status(500)
      .send({ message: "department details in the body are missing!" });
  }

  /* Check if the department already exists */
  let qry = await execQuery("SELECT * FROM `departments` WHERE name=?;", [
    req.body.name,
  ]);
  if (qry.error) return next(qry.error);
  if (qry.results.length > 0)
    return res.status(403).send({ message: "department already exist" });

  /* Inserting into the database */
  qry = await execQuery("INSERT INTO `departments` (`name`) values (?);", [
    req.body.name,
    req.body.departmentid,
  ]);
  if (qry.error) return next(qry.error);

  return res.status(201).send({ message: "Successfully added a department" });
};

/**
 * Delete a specific department from the database
 * Precondition:
 *  department id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 201
 *  Object: {departments}
 *
 */

exports.remove = async (req, res, next) => {
  let qry1 = await execQuery("SELECT * FROM `departments` WHERE id=?;", [
    req.params.id,
  ]);
  if (qry1.results.length == 0)
    return res.status(404).send({ message: "department not found" });
  let qry = await execQuery("DELETE FROM `departments` WHERE id=?", [
    req.params.id,
  ]);
  if (qry.error) return next(qry.error);

  return res
    .status(200)
    .send(res.results[0], { message: "department deleted successfully" });
};

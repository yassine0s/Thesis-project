const { execQuery } = require("./functions");

/**
 * Get all subjects data
 * Returns:
 *  status: 200
 *  Object: [subject]
 *
 */
exports.get_all = async (req, res, next) => {
  console.log("[subjects/get_all]: getting subjects data: ");
  let qry = await execQuery("SELECT * FROM `subjects`;", []);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};
/**
 * Get all subjects data related to specific department
 * Returns:
 *  status: 200
 *  Object: [subject]
 *
 */
 exports.get_dsubjs = async (req, res, next) => {
  console.log("[subjects/get_dsubjs]: getting subjects data: ");
  let qry = await execQuery("SELECT * FROM `subjects WHERE departmentid = ?`;", [req.params.did]);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};

/**
 * Get a specific subject data
 * Precondition:
 *  subject id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 200
 *  Object: subject
 *
 */
exports.get_one = async (req, res, next) => {
  let qry = await execQuery("SELECT * FROM `subjects` WHERE id = ?;", [
    req.params.id,
  ]);
  if (qry.error) return next(qry.error);
  if (qry.results.length == 0)
    return res.status(404).send({ message: "Subject not found" });

  return res.status(200).send(qry.results[0]);
};

/**
 * Add a subject to the database.
 * Request body should contain: name, dapartment id
 *
 *
 * Returns:
 *  status 201
 *  {message: message}
 *
 */

exports.create = async (req, res, next) => {
  if (!req.body.name || !req.body.departmentid) {
    return res
      .status(500)
      .send({ message: "subject details in the body are missing!" });
  }

  /* Check if the subject already exists */
  let qry = await execQuery("SELECT * FROM `subjects` WHERE name=?;", [
    req.body.name,
  ]);
  if (qry.error) return next(qry.error);
  if (qry.results.length > 0)
    return res.status(403).send({ message: "subject already exist" });

  /* Inserting into the database */
  qry = await execQuery(
    "INSERT INTO `subjects` (`name`, `departmentid`) values (?,?);",
    [req.body.name, req.body.departmentid]
  );
  if (qry.error) return next(qry.error);

  return res.status(201).send({ message: "Successfully added a subject" });
};

/**
 * Delete a specific subject from the database
 * Precondition:
 *  subjects id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 201
 *  Object: {subjects}
 *
 */

exports.remove = async (req, res, next) => {
  let qry1 = await execQuery("SELECT * FROM `subjects` WHERE id=?;", [
    req.params.id,
  ]);
  if (qry1.results.length == 0)
    return res.status(404).send({ message: "subject not found" });
  let qry = await execQuery("DELETE FROM `subjects` WHERE id=?", [
    req.params.id,
  ]);
  if (qry.error) return next(qry.error);

  return res
    .status(200)
    .send(res.results[0], { message: "subject deleted successfully" });
};

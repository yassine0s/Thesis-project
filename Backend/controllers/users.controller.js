const { execQuery } = require("./functions");

/**
 * Get all users data
 * Returns:
 *  status: 200
 *  Object: [user]
 *
 */
exports.get_all = async (req, res, next) => {
  console.log("[users/get_all]: getting users data: ");
  let qry = await execQuery("SELECT * FROM `users`;", []);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};

/**
 * Get a specific user data
 * Precondition:
 *  user id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 200
 *  Object: user
 *
 */
exports.get_one = async (req, res, next) => {
  let qry = await execQuery("SELECT * FROM `users` WHERE id = ?;", [
    req.params.id,
  ]);
  if (qry.error) return next(qry.error);
  if (qry.results.length == 0)
    return res.status(404).send({ message: "user not found" });

  return res.status(200).send(qry.results[0]);
};

/**
 * Add a users to the database.
 * Request body should contain: username, first name, last name, email , type
 *
 *
 * Returns:
 *  status 201
 *  {message: message}
 *
 */

exports.create = async (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.type ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email
  ) {
    return res
      .status(500)
      .send({ message: "user details in the body are missing!" });
  }

  /* Check if the user already exists */
  let qry = await execQuery("SELECT * FROM `users` WHERE email=?;", [
    req.body.email,
  ]);
  if (qry.error) return next(qry.error);
  if (qry.results.length > 0)
    return res.status(403).send({ message: "user already exist" });

  /* Inserting into the database */
  qry = await execQuery(
    "INSERT INTO `users` (`username`, `firstname`, `lastname`, `email`, `type`) values (?,?,?,?,?);",
    [
      req.body.username,
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.type,
    ]
  );
  if (qry.error) return next(qry.error);

  return res.status(201).send({ message: "Successfully added a user" });
};

/**
 * Delete a specific user from the database
 * Precondition:
 *  users id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 201
 *  Object: {users}
 *
 */

exports.remove = async (req, res, next) => {
  let qry1 = await execQuery("SELECT * FROM `users` WHERE id=?;", [
    req.params.id,
  ]);
  if (qry1.results.length == 0)
    return res.status(404).send({ message: "user not found" });
  let qry = await execQuery("DELETE FROM `users` WHERE id=?", [req.params.id]);
  if (qry.error) return next(qry.error);

  return res.status(200).send({ message: "user deleted successfully" });
};

/**
 * Update a specific user from the database
 * Precondition:
 *  user id must be given as a parameter to the request.
 *  Request body should contain: username, firstname, lastname, email or type
 * 
 * Returns:
 *  status: 201
 *  Object: {message: ...}
 * 
 */
 exports.update = async (req, res, next) => {
    const id = req.params.id;
    
    /* Get current user data*/
    let qry = await execQuery('SELECT * FROM `users` WHERE id=?;', [id]);
    if(qry.error)
        return next(qry.error);
    if(qry.results.length === 0)
        return res.status(404).send({message: "user not found."});

    /* Check what we need to update */
    const username = req.body.username || qry.results[0].username;
    const firstname = req.body.firstname || qry.results[0].firstname;
    const lastname = req.body.statlastnameus || qry.results[0].lastname;
    const email = req.body.email || qry.results[0].email;
    const type = req.body.type || qry.results[0].type;

    /* Updating user data */
    qry = await execQuery(
        'UPDATE `users` \
         SET `username` = ?, `firstname` = ? ,`lastname` = ?, `email` = ?, `type` = ? \
         WHERE id = ?;', 
        [username, firstname, lastname, email, type, id]
    );
    if(qry.error) 
        return next(qry.error);
    return res.status(200).send({message: "user has been successfully updated"});
};

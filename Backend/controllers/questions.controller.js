const { execQuery } = require("./functions");

/**
 * Get all questions data
 * Returns:
 *  status: 200
 *  Object: [question]
 *
 */

exports.get_all = async (req, res, next) => {
  console.log("[questions/get_all]: getting all questions : ");
  let qry = await execQuery("SELECT * FROM `questions`;", []);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};

/**
 * Get a question related to the logged in  profile
 * Precondition:
 *  user id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 200
 *  Object: question
 *
 */
exports.get_own = async (req, res, next) => {
  console.log("[questions/get_own]: getting user questions : ");
  let qry = await execQuery("SELECT * FROM `questions` WHERE id=?;", [
    req.params.uid,
  ]);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};

/**
 * ask a question.
 * Request body should contain: title, userid, category
 *
 *
 * Returns:
 *  status 201
 *  {message: message}
 *
 */

exports.create = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.question ||
    !req.body.userid ||
    !req.body.category
  ) {
    return res
      .status(500)
      .send({ message: "question details in the body are missing!" });
  }

  /* Inserting into the database */
  qry = await execQuery(
    "INSERT INTO `questions` (`title`, `question`, `userid`, `subjectid`, `category`) values (?,?,?,?,?);",
    [
      req.body.title,
      req.body.question,
      req.body.userid,
      req.body.subjectid,
      req.body.category,
    ]
  );
  if (qry.error) return next(qry.error);
  return res.status(201).send({ message: "Successfully added a question" });
};

/**
 * Get a question depending on a specific filter
 * Precondition:
 *
 *
 * Returns:
 *  status: 200
 *  Object: question
 *
 */
exports.get_by_category = async (req, res, next) => {
  const category = req.query.category;
  const subjectid = req.query.subjectid;

  console.log("category is : ", category);
  console.log("subjectid is : ", subjectid);

  if (category == "adminstration") {
    let qry = await execQuery("SELECT * FROM `questions` WHERE category=?;", [
      category,
    ]);
    if (qry.error) return next(qry.error);
    if (qry.results.length === 0)
      return res
        .status(404)
        .send({ message: "no question with that category" });
    return res.status(200).send(qry.results);
  } else if (category == "educational") {
    let qry = await execQuery(
      "SELECT * FROM `questions` inner JOIN `subjects` ON questions.subjectid = subjects.id =? WHERE category=?;",
      [subjectid, category]
    );

    if (qry.error) return next(qry.error);
    if (qry.results.length === 0)
      return res
        .status(404)
        .send({ message: "no question with that category" });
    return res.status(200).send(qry.results);
  } else
    return res.status(404).send({ message: "Please enter a valid category" });
};
/**
 * Delete a specific question from the database
 * Precondition:
 *  question id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 201
 *  Object: {question}
 *
 */

exports.remove = async (req, res, next) => {
  let qry1 = await execQuery("SELECT * FROM `questions` WHERE id=?;", [
    req.params.id,
  ]);
  if (qry1.results.length == 0)
    return res.status(404).send({ message: "question not found" });
  let qry = await execQuery("DELETE FROM `questions` WHERE id=?", [
    req.params.id,
  ]);
  if (qry.error) return next(qry.error);

  return res.status(200).send({ message: "question deleted successfully" });
};

/**
 * Update a specific question
 * Precondition:
 *  user id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 201
 *  Object: {message: ...}
 *
 */
exports.update = async (req, res, next) => {
  const id = req.params.id;

  /* Get current user data*/
  let qry = await execQuery("SELECT * FROM `questions` WHERE id=?;", [id]);
  if (qry.error) return next(qry.error);
  if (qry.results.length === 0)
    return res.status(404).send({ message: "question not found." });

  /* Check what we need to update */
  const title = req.body.title || qry.results[0].title;
  const question = req.body.question || qry.results[0].question;
  const userid = req.body.userid || qry.results[0].userid;
  const subjectid = req.body.subjectid || qry.results[0].subjectid;
  const category = req.body.category || qry.results[0].category;

  /* Updating user data */
  qry = await execQuery(
    "UPDATE `questions` \
       SET `title` = ?, `question` = ? ,`userid` = ?, `subjectid` = ?, `category` = ? \
       WHERE id = ?;",
    [title, question, userid, subjectid, category, id]
  );
  if (qry.error) return next(qry.error);
  return res
    .status(200)
    .send({ message: "question has been successfully updated" });
};

/**
 * Get a question depending on a specific filter
 * Precondition:
 *
 *
 * Returns:
 *  status: 200
 *  Object: question
 *
 */
exports.get_by_title = async (req, res, next) => {
  const title = '%'+req.query.title+'%';

  console.log("looking for similar title as : ", title);

  let qry = await execQuery("SELECT * FROM `questions` WHERE title LIKE ?;", [
    title
  ]);

  if (qry.error) return next(qry.error);
  if(qry.results.length === 0)
  return res.status(404).send({message: "no question with that title"});

  return res.status(200).send(qry.results);
};

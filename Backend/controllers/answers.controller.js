const { execQuery } = require("./functions");


/**
 * add an answer.
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
      !req.body.answer ||
      !req.body.questionid ||
      !req.body.userid
    ) {
      return res
        .status(500)
        .send({ message: "answer details in the body are missing!" });
    }
  
    /* Inserting into the database */
    qry = await execQuery(
      "INSERT INTO `answers` (`answer`, `questionid`, `userid`) values (?,?,?);",
      [
        req.body.answer,
        req.body.questionid,
        req.body.userid,
      ]
    );
    if (qry.error) return next(qry.error);
    return res.status(201).send({ message: "Successfully added an answer" });
  };



  /**
 * Delete a specific answer from the database
 * Precondition:
 *  answer id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 201
 *  Object: {answer}
 *
 */

 exports.remove = async (req, res, next) => {
  let qry1 = await execQuery("SELECT * FROM `answers` WHERE id=?;", [
    req.params.id,
  ]);
  if (qry1.results.length == 0)
    return res.status(404).send({ message: "answer not found" });
  let qry = await execQuery("DELETE FROM `answers` WHERE id=?", [req.params.id]);
  if (qry.error) return next(qry.error);

  return res.status(200).send({ message: "answer deleted successfully" });
};

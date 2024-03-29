const {get_dsubjs,create, get_all, get_one, remove,update} = require("../controllers/subjects.controller") ;
const express = require('express');
const router = express.Router();

// Get All
router.get("/", get_all);

// get subjects related to department
router.get("/depsubjects/:did",get_dsubjs)

// Get one
router.get("/:id", get_one);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)

// update
router.put("/:id", update)


module.exports = router;

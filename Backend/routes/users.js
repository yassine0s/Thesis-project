
const {create, get_all, get_one, remove,update} = require("../controllers/users.controller") ;
const express = require('express');
const router = express.Router();

// Get All
router.get("/", get_all);

// Get one
router.get("/:id", get_one);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)

// Update
router.put("/:id", update)

// Solve



module.exports = router;

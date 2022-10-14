const {create, get_all, get_by_category, remove,get_own,update,get_by_title} = require("../controllers/questions.controller") ;
const express = require('express');
const router = express.Router();

// // Get All
router.get("/", get_all);


// Create
router.post("/", create);


// Get own questions
router.get("/profile/:uid", get_own);


// get by filter
router.get("/filter/category", get_by_category);

// get by filter
router.get("/filter/title", get_by_title);

//delete
router.delete("/:id", remove)


// update
router.put("/:id", update);

// Solve



module.exports = router;

const express = require('express');
// const adminController = require('../controllers/admin');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/questions', require('./questions'));
router.use('/departments', require('./departments'));
router.use('/subjects', require('./subjects'));
router.use('/answers', require('./answers'));

module.exports = router;
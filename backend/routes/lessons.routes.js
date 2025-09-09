const express = require("express");
const { generate_lesson } = require("../controller/lessons.controllers");
const router = express.Router();


router.post('/generate_lesson', generate_lesson)

module.exports = router;
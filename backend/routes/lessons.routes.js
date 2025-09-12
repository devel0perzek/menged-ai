const express = require("express");
const { generate_lesson } = require("../controllers/lessons.controllers");
const router = express.Router();

router.post("/generate_lesson", generate_lesson);

module.exports = router;

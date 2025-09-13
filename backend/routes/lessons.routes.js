const express = require("express");
const { generate_lesson } = require("../controllers/lessons.controllers");
const router = express.Router();
const multer = require("multer");

// Configure multer for in-memory storage, which is fine for small form data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
    "/generate_lesson",
    upload.fields([{ name: "prompt" }, { name: "files" }]),
    generate_lesson
);

module.exports = router;

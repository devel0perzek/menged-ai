require("dotenv").config();

// IMPORTS
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const lessonRoutes = require("./routes/lessons.routes")

// CONFIGURATIONS
const app = express();
const PORT = process.env.PORT || 3000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
app.use(express.json());

app.use('/lessons', lessonRoutes)

app.get("/", (req, res) => {
    res.send("Menged API is running successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});

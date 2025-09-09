require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Menged API is running successfully");
});

app.post("/generate", async (req, res) => {
    const { message } = await req.body;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    });
    console.log(response.text);

    res.json({ reply: response.text });
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});

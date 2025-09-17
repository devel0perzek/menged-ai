require("dotenv").config();

// IMPORTS
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const lessonRoutes = require("./routes/lessons.routes");
const webhookRoutes = require("./routes/webhooks.route");

// CONFIGURATIONS
const app = express();
const PORT = process.env.PORT || 4000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(clerkMiddleware());
app.use(cors({ origin: "*" }));
app.use("/lessons", requireAuth(), lessonRoutes);
app.use("/webhooks/clerk", webhookRoutes);

app.get("/", (req, res) => {
    res.send("Menged API is running successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});

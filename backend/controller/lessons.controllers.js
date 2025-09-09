const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



exports.generate_lesson = async (req, res) => {
    const { message } = await req.body;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
    });
    console.log(response.text);

    res.json({ reply: response.text });
}

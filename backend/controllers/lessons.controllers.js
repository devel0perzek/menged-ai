const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generate_lesson = async (req, res) => {
    // The prompt is now available in req.body because of multer middleware
    const promptMessage = req.body.prompt;
    console.log("Received message:", promptMessage);

    const prompt = `
        You are an AI lesson generator. Your task is to create structured, interactive, and engaging lessons for students.

Always return your response in valid JSON format with the following structure:

{
  "title": "string (title of the lesson)",
  "introduction": "string (brief explanation of the topic, simple and clear)",
  "objectives": ["list of learning goals"],
  "content": [
    {
      "type": "text",
      "body": "explanation in simple steps"
    },
    {
      "type": "example",
      "body": "real-world example to make the topic relatable"
    },
    {
      "type": "interactive",
      "component": "graph | quiz | flashcards | code_editor",
      "instructions": "how the student should use this component",
      "data": {}  // structured data needed to render the component
    }
  ],
  "summary": "string (recap of the topic in simple words)",
  "quiz": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "string (correct option)"
    }
  ],
  "further_reading": [
    { "title": "string", "url": "string" }
  ]
}

Rules:
- Always produce JSON only (no markdown, no extra text).
- Keep explanations concise and student-friendly.
- Include at least one interactive component (quiz, graph, or flashcards).
- Make quizzes multiple-choice.
- Ensure the JSON is always valid and consistent.

Here is the question
${promptMessage}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let rawOutput = response.text;
        rawOutput = rawOutput.replace(/```json|```/g, "").trim();

        const lessonBlueprint = JSON.parse(rawOutput);
        console.log(response.text);
        res.json(lessonBlueprint);
    } catch (error) {
        res.status(500).json({
            error: "Invalid JSON from LLM or backend error",
            raw: error.message,
        });
    }
};

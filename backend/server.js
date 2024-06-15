const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: "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",
});

let questionCount = 0;
const maxQuestions = 3;

const initialMessages = [
  {
    role: "system",
    content:
      "You are an interviewer who should ask only 3 basic questions one by one that has one word answer to Kavya related to months.",
  },
];

let messages = [...initialMessages];

router.post("/chat", async (req, res) => {
  try {
    const userResponse = req.body.transcript;
    console.log("the user response is", userResponse);
    messages.push({ role: "user", content: userResponse });

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    let response = "";
    for await (const chunk of chatCompletion) {
      const delta = chunk.choices[0]?.delta?.content || "";
      response += delta;
    }

    messages.push({ role: "assistant", content: response });
    console.log("Res", response);
    res.json({ role: "assistant", content: response });

    console.log("Message is", messages);
  } catch (error) {
    console.error("Error during conversation:", error);
    res.status(500).json({ error: "Error during conversation" });
  }
});

module.exports = router;

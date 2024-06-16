const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

let messages = [];

router.post("/category", async (req, res) => {
  try {
    const { topic, difficulty } = req.body.data;

    messages = [
      {
        role: "system",
        content: `You are an interviewer who should ask only 3 ${difficulty} questions one by one related to ${topic}. Greet the user and directly start with the question. After the user responds, give a very short explanation and move to next question. Once all the questions are done, say "Thank you for interviewing with QnAce."`,
      },
    ];

    res.status(200).json({ message: "Success: Prompt updated" });
  } catch (err) {
    console.log("Err", err);
  }
});

router.post("/chat", async (req, res) => {
  try {
    const userResponse = req.body.transcript;
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
    res.json({ role: "assistant", content: response });
  } catch (error) {
    console.error("Error during conversation:", error);
    res.status(500).json({ error: "Error during conversation" });
  }
});

router.get("/feedback", async (req, res) => {
  const interviewFeedback = {
    technicalFeedback: [
      {
        id: 1,
        response: `For the first question, you should have answered "Redux" instead of "used react use State".`,
        rating: 3,
      },
      {
        id: 2,
        response: `For the second question, you got it right! You correctly answered that a smaller reusable UI component is called a "component".`,
        rating: 5,
      },
      {
        id: 3,
        response: `For the third question, you listed multiple libraries, but didn't quite get the one I was looking for. You should have answered "Tailwind CSS" instead of listing multiple libraries.`,
        rating: 2,
      },
    ],
    generalFeedback: `You didn't quite get the answers right, but you did show some enthusiasm and engagement throughout the conversation. Keep practicing and learning, and you'll get better with time!`,
  };

  const prompt = ` Generate feedback in this JSON format, with no added explanation text strictly based on this format ${interviewFeedback}. Provide detailed feedback in "technicalFeedback" based on the response given by the user for the questions. In the "generalFeedback" give constructive feedback for user based on the interview, include specific areas of strength, areas for improvement, and suggestions for further learning . Give a rating on the scale of 1 to 5 based on user's response.`;

  try {
    const feedbackMessage = [
      {
        role: "system",
        content: prompt,
      },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: feedbackMessage,
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

    res.status(200).json({ message: response });
  } catch (err) {
    console.log("Err", err);
  }
});

module.exports = router;

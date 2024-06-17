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
  } catch (err) {}
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
    res.status(500).json({ error: "Error during conversation" });
  }
});
const theMessage = [
  {
    role: "system",
    content:
      'You are an interviewer who should ask only 3 easy questions one by one related to CSS. Greet the user and directly start with the question. After the user responds, give a very short explanation and move to next question. Once all the questions are done, say "Thank you for interviewing with QnAce."',
  },
  { role: "user", content: "" },
  {
    role: "assistant",
    content:
      "Welcome to QnAce! We're excited to have you in for an interview today. We'll be asking you a series of questions related to CSS. Here's your first question:\n" +
      "\n" +
      "What is a CSS selector, and how is it used in CSS?\n" +
      "\n" +
      "Please respond, and we'll take it from there.",
  },
  {
    role: "user",
    content:
      "CSS selectors are used to target HTML elements on our web page that we want to style",
  },
  {
    role: "assistant",
    content:
      "That's correct! CSS selectors are a crucial part of CSS, as they determine which HTML elements to apply styles to. Well done!\n" +
      "\n" +
      "Let's move on to the next question. Here it is:\n" +
      "\n" +
      "What is the difference between the `id` and `class` attributes in CSS?",
  },
  {
    role: "user",
    content:
      "ID is a unique identifier where as classes are not Yoni but both are used to styling",
  },
  {
    role: "assistant",
    content:
      "That's mostly correct! ID is indeed a unique identifier, while classes can be used multiple times on the same HTML document. However, IDs should be unique within a document, while classes can be reused as many times as needed.\n" +
      "\n" +
      "The main difference is that IDs are typically used for single-purpose styling, whereas classes are often used for repetitive styling. IDs are also more precise in terms of targeting a specific element, while classes are more general and can be applied to multiple elements.\n" +
      "\n" +
      "You're getting close!\n" +
      "\n" +
      "Next question:\n" +
      "\n" +
      "What is the purpose of the `!important` keyword in CSS?",
  },
  {
    role: "user",
    content: "important keyword is used to specify very important classes",
  },
  {
    role: "assistant",
    content:
      "I think there's a misunderstanding! The `!important` keyword in CSS is not used to specify important classes, but rather to give the declaration higher priority and override other styling rules. When you add `!important` to the end of a CSS declaration, it means that this specific style will take precedence over other styles with the same selector.\n" +
      "\n" +
      "For example: `color: red !important;`\n" +
      "\n" +
      "This means that the color of the text will always be red, even if another stylesheet or a higher-priority selector is trying to change it.\n" +
      "\n" +
      "Don't worry, it's a common misconception!\n" +
      "\n" +
      "Thank you for interviewing with QnAce!",
  },
];

router.get("/feedback", async (req, res) => {
  const interviewFeedback = {
    technicalFeedback: [
      {
        id: 1,
        feedback: "[feedback_1]",
        rating: "[rating_1]",
      },
      {
        id: 2,
        feedback: "[feedback_2]",
        rating: "[rating_2]",
      },
      {
        id: 3,
        feedback: "[feedback_3]",
        rating: "[rating_2]",
      },
    ],
    analysis: [
      { id: 1, paramName: "Knowledge", percent: "70" },
      { id: 1, paramName: "Precision", percent: "20" },
      { id: 1, paramName: "Confidence", percent: "40" },
    ],
    generalFeedback: "[general_feedback]",
  };

  const prompt = `Analyse the conversation from ${JSON.stringify(
    messages
  )} to give detailed feedback and format it strictly according to ${JSON.stringify(
    interviewFeedback
  )}. Ensure the result you will provide contains only the object data without any surrounding text or additional strings. Dont write 
  "here is the response" or anything additional`;

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
  } catch (err) {}
});

router.get("/feedback-error", async (req, res) => {
  const fallbackPrompt = `Analyse the conversation from ${JSON.stringify(
    theMessage
  )} to give detailed constructive feedback in first person. Ensure the result you will provide contains only the feedback without any surrounding text or additional strings. Don't write 
  "here is the response" or anything additional`;

  console.log("falbackoprmit", fallbackPrompt);
  try {
    const fallbackMessage = [
      {
        role: "system",
        content: fallbackPrompt,
      },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: fallbackMessage,
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

    console.log("check response", response);
    res.status(200).json({ message: response });
  } catch (err) {}
});

module.exports = router;

const express = require("express");
const app = express();
const chatRoute = require("./server.js");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // Add this block
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api", chatRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

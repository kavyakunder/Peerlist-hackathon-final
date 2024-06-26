const express = require("express");
const app = express();
const chatRoute = require("./server.js");
const cors = require("cors");

const corsOptions = {
  origin: [
    "https://peerlist-hackathon-final-frontend.vercel.app",
    "https://qnace.vercel.app",
    "http://localhost:3000",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", chatRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

import React, { useState } from "react";
import axios from "axios";
function SelectTopicPage() {
  const [topic, setTopic] = useState("React");
  const [difficulty, setDifficulty] = useState("easy");

  function handleDifficulty(level) {
    setDifficulty(level);
  }

  function handleTopic(topic) {
    setTopic(topic);
  }

  async function sendDataToBackend() {
    const data = { topic, difficulty };

    try {
      const response = await axios.post("http://localhost:5000/api/chat2", {
        data,
      });

      console.log("respons eisssss", response);
    } catch (error) {
      console.error("Error during conversation:", error);
    }
  }

  return (
    <div style={{ margin: "9rem" }}>
      <h1>The page of selecting a topic and level of difficulty</h1>

      <h2>Topic</h2>
      <button onClick={() => handleTopic("React")}>React </button>
      <button onClick={() => handleTopic("Javascript")}>Javascript </button>
      <button onClick={() => handleTopic("CSS")}>CSS </button>

      <h2>Level of difficulty</h2>
      <button onClick={() => handleDifficulty("easy")}>Easy</button>
      <button onClick={() => handleDifficulty("medium")}>Medium</button>
      <button onClick={() => handleDifficulty("hard")}>Hard</button>
      <br />
      <br />

      <button onClick={sendDataToBackend}>Lets start the interview</button>
    </div>
  );
}

export default SelectTopicPage;

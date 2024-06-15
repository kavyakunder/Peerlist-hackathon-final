import React, { useState } from "react";
import topicPageStyles from "../styles/topicPage.module.css";
import axios from "axios";

const ALL_LEVELS = [
  { id: 1, name: "Easy" },
  { id: 2, name: "Medium" },
  { id: 3, name: "Hard" },
];

const ALL_TOPICS = [
  { id: 1, name: "React" },
  { id: 2, name: "Javascript" },
  { id: 3, name: "CSS" },
];

function SelectTopicPage() {
  const [topic, setTopic] = useState({ id: 1, name: "React" });
  const [difficulty, setDifficulty] = useState({ id: 1, name: "Easy" });

  function handleDifficulty(level) {
    setDifficulty(level);
  }

  function handleTopic(topic) {
    setTopic(topic);
  }

  async function sendCategoryToBackend() {
    const data = {
      topic: topic.name,
      difficulty: difficulty.name.toLowerCase(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/category", {
        data,
      });
      console.log("response is", response);
    } catch (error) {
      console.error("Error during conversation:", error);
    }
  }

  return (
    <div className={topicPageStyles.mainContainer}>
      <h1 className={topicPageStyles.mainHeading}>
        Choose a topic & difficulty level
      </h1>
      <div className={topicPageStyles.categoryContainer}>
        <div>
          <h2 className={topicPageStyles.categoryHeading}>Topic</h2>
          <div className={topicPageStyles.categoryBtnContainer}>
            {ALL_TOPICS.map((topicName) => (
              <button
                key={topicName.id}
                className={`${topicPageStyles.categoryBtn} ${
                  topicName.name === topic.name
                    ? topicPageStyles.selectedOption
                    : ""
                }`}
                onClick={() => handleTopic(topicName)}
              >
                {topicName.name}
              </button>
            ))}
          </div>
        </div>
        <div className={topicPageStyles.verticalLine}></div>
        <div>
          <h2 className={topicPageStyles.categoryHeading}>Level</h2>
          <div className={topicPageStyles.categoryBtnContainer}>
            {ALL_LEVELS.map((level) => {
              return (
                <button
                  key={level.id}
                  className={`${topicPageStyles.categoryBtn} ${
                    level.name.toLowerCase() === difficulty.name.toLowerCase()
                      ? topicPageStyles.selectedOption
                      : ""
                  }`}
                  onClick={() => handleDifficulty(level)}
                >
                  {level.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className={topicPageStyles.startInterviewBtnContainer}>
        <button
          className={topicPageStyles.startInterviewButton}
          onClick={sendCategoryToBackend}
        >
          Begin Interview
        </button>
      </div>
    </div>
  );
}

export default SelectTopicPage;

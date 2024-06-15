import React, { useState } from "react";
import topicPageStyles from "../styles/topicPage.module.css";
import axios from "axios";

const ALL_LEVELS = ["Easy", "Medium", "Hard"];
const ALL_TOPICS = ["React", "Javascript", "CSS"];

function SelectTopicPage() {
  const [topic, setTopic] = useState("React");
  const [difficulty, setDifficulty] = useState("Easy");

  function handleDifficulty(level) {
    setDifficulty(level.toLowerCase());
  }

  function handleTopic(topic) {
    setTopic(topic);
  }

  async function sendCategoryToBackend() {
    const data = { topic, difficulty };

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
                key={topicName}
                className={`${topicPageStyles.categoryBtn} ${
                  topicName === topic ? topicPageStyles.selectedOption : ""
                }`}
                onClick={() => handleTopic(topicName)}
              >
                {topicName}
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
                  key={level}
                  className={`${topicPageStyles.categoryBtn} ${
                    level.toLowerCase() === difficulty.toLowerCase()
                      ? topicPageStyles.selectedOption
                      : ""
                  }`}
                  onClick={() => handleDifficulty(level.toLowerCase())}
                >
                  {level}
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

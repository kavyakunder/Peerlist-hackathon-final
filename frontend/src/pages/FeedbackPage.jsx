import StarRating from "../components/ui/StarRating";
import feedbackPageStyles from "../styles/feedbackPage.module.css";
import { Link } from "react-router-dom";
import landingPageStyles from "../styles/landingPage.module.css";
import { useEffect, useState } from "react";
import { DEV_URL } from "../api";
import axios from "axios";

const INTERVIEW_FEEDBACK = {
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

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState();

  const [interviewFeedback, setInterviewFeedback] =
    useState(INTERVIEW_FEEDBACK);

  useEffect(() => {
    handleGetFeedback();
  }, []);

  const handleGetFeedback = async () => {
    try {
      const response = await axios.get(`${DEV_URL}/api/feedback`);

      if (response?.data?.message) {
        const parseData = JSON.parse(response?.data?.message);

        setFeedback(response.data.message);
        setInterviewFeedback(parseData);
      }

      // resetTranscript();
    } catch (error) {}
  };
  return (
    <div className={feedbackPageStyles.feedbackPageLayout}>
      <div className={feedbackPageStyles.feedbackSection}>
        <h1 className={feedbackPageStyles.centeredTitle}>Technical Feedback</h1>
        {interviewFeedback?.technicalFeedback.map((item) => (
          <div key={item.id} className={feedbackPageStyles.feedbackContent}>
            <p className={feedbackPageStyles.feedbackText}>{item.feedback}</p>
            <StarRating rating={item.rating.toString().split("/")[0]} />
          </div>
        ))}
      </div>
      <div className={feedbackPageStyles.feedbackSection}>
        <h1 className={feedbackPageStyles.centeredTitle}>Analysis</h1>

        {interviewFeedback.analysis?.map((item) => {
          return (
            <div
              key={item.id}
              className={feedbackPageStyles.progressBarContainer}
            >
              <p>{item.paramName}</p>
              <div className={feedbackPageStyles.progress}>
                <div
                  style={{ width: `${item.percent}%` }}
                  className={feedbackPageStyles.progressValue}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={feedbackPageStyles.feedbackSection}>
        <h1 className={feedbackPageStyles.centeredTitle}>General Feedback</h1>
        <p>{interviewFeedback?.generalFeedback}</p>
      </div>
      <Link to="/" className={landingPageStyles.startButton}>
        Go to home page
      </Link>
    </div>
  );
}

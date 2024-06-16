import { Doughnut } from "react-chartjs-2";
import StarRating from "../components/ui/StarRating";
import feedbackPageStyles from "../styles/feedbackPage.module.css";
import { data, options } from "../components/PieChart";
import { Link } from "react-router-dom";
import landingPageStyles from "../styles/landingPage.module.css";
import { useEffect, useState } from "react";
import { LOCAL_URL } from "../api";
import axios from "axios";

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

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState();
  console.log("🚀 ~ FeedbackPage ~ feedback:", feedback);

  useEffect(() => {
    handleGetFeedback();
  }, []);

  const handleGetFeedback = async () => {
    try {
      const response = await axios.get(`${LOCAL_URL}/api/feedback`);
      console.log("🚀 ~ handleGetFeedback ~ response:", response.data.message);
      setFeedback(response.data.message);

      // resetTranscript();
    } catch (error) {
      console.error("Error during conversation:", error);
    }
  };
  return (
    <div className={feedbackPageStyles.feedbackPageLayout}>
      <div className={feedbackPageStyles.feedbackSection}>
        <h1>Technical Feedback</h1>
        {interviewFeedback.technicalFeedback.map((item) => (
          <div key={item.id} className={feedbackPageStyles.feedbackContent}>
            <div className={feedbackPageStyles.feedback}>
              <p>{item.id}.</p>
              <p className={feedbackPageStyles.feedbackText}>{item.response}</p>
            </div>
            <StarRating rating={item.rating} />
          </div>
        ))}
      </div>
      <div className={feedbackPageStyles.feedbackSection}>
        <h1>Analysis</h1>
        <div>
          <Doughnut data={data} width={500} height={500} options={options} />
        </div>
      </div>
      <div className={feedbackPageStyles.feedbackSection}>
        <h1>General Feedback</h1>
        <p>{interviewFeedback.generalFeedback}</p>
      </div>
      <Link to="/" className={landingPageStyles.startButton}>
        Go to home page
      </Link>
    </div>
  );
}

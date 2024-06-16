import StarRating from "../components/ui/StarRating";
import feedbackPageStyles from "../styles/feedbackPage.module.css";

const feedback = [
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
];

export default function FeedbackPage() {
  return (
    <div>
      <div className={feedbackPageStyles.feedbackPageLayout}>
        <h1> Feedback </h1>
        {feedback.map((item) => (
          <div key={item.id} className={feedbackPageStyles.feedback}>
            <p className={feedbackPageStyles.feedbackText}>{item.response}</p>
            <StarRating rating={item.rating} />
          </div>
        ))}
      </div>
    </div>
  );
}

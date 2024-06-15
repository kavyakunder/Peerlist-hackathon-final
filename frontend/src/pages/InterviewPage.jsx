import interviewStyles from "../styles/interviewPage.module.css";
import qnAceInterviewer from "../assets/qnAceInterviewer.jpg";
import qnAceInterviewee from "../assets/qnAceInterviewee.png";

export default function InterviewPage() {
  return (
    <div className={interviewStyles.interviewLayout}>
      <div
        className={`${interviewStyles.interviewLHS} ${interviewStyles.redBorder}`}
      >
        <div
          className={`${interviewStyles.redBorder} ${interviewStyles.interviewerSection}`}
        >
          <img
            src={qnAceInterviewer}
            alt="AI Interviewer"
            className={interviewStyles.interviewerProfile}
          />
        </div>
        <div
          className={`${interviewStyles.redBorder} ${interviewStyles.intervieweeSection}`}
        >
          <img
            src={qnAceInterviewee}
            alt="AI Interviewee"
            className={interviewStyles.interviewerProfile}
          />
        </div>
      </div>
      <div
        className={`${interviewStyles.interviewRHS} ${interviewStyles.redBorder}`}
      >
        RHS
      </div>
    </div>
  );
}

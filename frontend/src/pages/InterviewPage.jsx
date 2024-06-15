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
          <p className={interviewStyles.sectionTitle}>Interviewer</p>
          <img
            src={qnAceInterviewer}
            alt="AI Interviewer"
            className={interviewStyles.interviewerProfile}
          />
        </div>
        <div
          className={`${interviewStyles.redBorder} ${interviewStyles.intervieweeSection}`}
        >
          <p className={interviewStyles.sectionTitle}>You</p>
          <img
            src={qnAceInterviewee}
            alt="AI Interviewee"
            className={interviewStyles.intervieweeProfile}
          />
          <div className={interviewStyles.intervieweeControlButtonGroup}>
            <button className={interviewStyles.intervieweeControlButton}>
              Start recording
            </button>
            <button
              className={interviewStyles.intervieweeControlButtonInactive}
            >
              Stop recording
            </button>
          </div>
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

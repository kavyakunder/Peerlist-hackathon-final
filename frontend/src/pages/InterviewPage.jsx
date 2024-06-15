import interviewStyles from "../styles/interviewPage.module.css";
import qnAceInterviewer from "../assets/qnAceInterviewer.jpg";
import qnAceInterviewee from "../assets/qnAceInterviewee.png";

export default function InterviewPage() {
  return (
    <div className={interviewStyles.interviewLayout}>
      <div className={interviewStyles.interviewLHS}>
        <div
          className={`${interviewStyles.sectionBackground} ${interviewStyles.interviewerSection}`}
        >
          <p className={interviewStyles.sectionTitle}>Interviewer</p>
          <img
            src={qnAceInterviewer}
            alt="AI Interviewer"
            className={interviewStyles.interviewerProfile}
          />
        </div>
        <div
          className={`${interviewStyles.sectionBackground} ${interviewStyles.intervieweeSection}`}
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
      <div className={interviewStyles.interviewRHS}>
        <div
          className={`${interviewStyles.sectionBackground} ${interviewStyles.qASection}`}
        >
          <p className={interviewStyles.sectionTitle}>Question</p>
          <p className={interviewStyles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            delectus cum quis exercitationem, earum unde vero a facilis pariatur
            inventore molestias nostrum consectetur dicta sit magni possimus
            amet minima quod!
          </p>
        </div>
        <div
          className={`${interviewStyles.sectionBackground} ${interviewStyles.qASection} ${interviewStyles.answerSection}`}
        >
          <p className={interviewStyles.sectionTitle}>Answer</p>
          <p className={interviewStyles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            delectus cum quis exercitationem, earum unde vero a facilis pariatur
            inventore molestias nostrum consectetur dicta sit magni possimus
            amet minima quod! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Asperiores delectus cum quis exercitationem, earum
            unde vero a facilis pariatur inventore molestias nostrum consectetur
            dicta sit magni possimus amet minima quod! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Asperiores delectus cum quis
            exercitationem, earum unde vero a facilis pariatur inventore
            molestias nostrum consectetur dicta sit magni possimus amet minima
            quod!
          </p>
        </div>
      </div>
    </div>
  );
}

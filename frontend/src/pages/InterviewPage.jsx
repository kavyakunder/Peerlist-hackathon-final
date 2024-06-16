import { useState } from "react";
import interviewStyles from "../styles/interviewPage.module.css";
import qnAceInterviewer from "../assets/qnAceInterviewer.jpg";
import qnAceInterviewee from "../assets/qnAceInterviewee.png";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function InterviewPage() {
  const [aiResponse, setAiResponse] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
      interimResults: true,
    });
  };

  const handleStopListening = async () => {
    SpeechRecognition.stopListening();

    try {
      const response = await axios.post(
        "https://peerlist-hackathon-final.vercel.app/api/chat",
        {
          transcript,
        }
      );
      setAiResponse(response.data.content);
      speak(response.data.content);
      resetTranscript();
    } catch (error) {
      console.error("Error during conversation:", error);
    }
  };

  function speak(aiResponse) {
    const utterance = new SpeechSynthesisUtterance(aiResponse);

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[1];
    utterance.lang = "en-IN";
    speechSynthesis.speak(utterance);
  }

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
            <button
              onClick={handleStartListening}
              className={interviewStyles.intervieweeControlButton}
            >
              Start recording
            </button>
            <button
              onClick={handleStopListening}
              className={interviewStyles.intervieweeControlButtonInactive}
            >
              Stop recording
            </button>
            <p>Microphone: {listening ? "on" : "off"}</p>
          </div>
        </div>
      </div>
      <div className={interviewStyles.interviewRHS}>
        <div
          className={`${interviewStyles.sectionBackground} ${interviewStyles.qASection}`}
        >
          <p className={interviewStyles.sectionTitle}>Question</p>
          <p className={interviewStyles.sectionContent}>
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            delectus cum quis exercitationem, earum unde vero a facilis pariatur
            inventore molestias nostrum consectetur dicta sit magni possimus
            amet minima quod! */}
            {aiResponse}
          </p>
        </div>
        <div
          className={`${interviewStyles.sectionBackground} ${interviewStyles.qASection} ${interviewStyles.answerSection}`}
        >
          <p className={interviewStyles.sectionTitle}>Answer</p>
          <p className={interviewStyles.sectionContent}>
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            delectus cum quis exercitationem, earum unde vero a facilis pariatur
            inventore molestias nostrum consectetur dicta sit magni possimus
            amet minima quod! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Asperiores delectus cum quis exercitationem, earum
            unde vero a facilis pariatur inventore molestias nostrum consectetur
            dicta sit magni possimus amet minima quod! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Asperiores delectus cum quis
            exercitationem, earum unde vero a facilis pariatur inventore
            molestias nostrum consectetur dicta sit magni possimus amet minima
            quod! */}
            {transcript}
          </p>
        </div>
      </div>
    </div>
  );
}

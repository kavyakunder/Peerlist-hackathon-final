import { useEffect, useRef, useState } from "react";
import interviewStyles from "../styles/interviewPage.module.css";
import qnAceInterviewer from "../assets/qnAceInterviewer.jpg";
import qnAceInterviewee from "../assets/qnAceInterviewee.png";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import { LOCAL_URL } from "../api";

export default function InterviewPage() {
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState("");

  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [glowingEffect, setGlowingEffect] = useState({
    user: false,
    interviewer: false,
  });
  const isRun = useRef(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // starting loading before interview starts
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // send empty script on initial load so that groq ai starts responding
  useEffect(() => {
    const firstRequestToGroq = async () => {
      try {
        const response = await axios.post(`${LOCAL_URL}/api/chat`, {
          transcript: "",
        });
        setAiResponse(response.data.content);
        speak(response.data.content);
        // resetTranscript();
      } catch (error) {}
    };

    if (isRun.current === true) return;

    isRun.current = true;

    setTimeout(() => {
      firstRequestToGroq();
    }, 2000);
  }, []);

  useEffect(() => {
    const interviewComplete = "Thank you for interviewing with QnAce";

    if (
      aiResponse?.includes(interviewComplete) &&
      isInterviewerSpeaking === false
    ) {
      navigate("/feedback");
    }
  }, [aiResponse, isInterviewerSpeaking]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition</span>;
  }

  const handleStartListeningUser = () => {
    setGlowingEffect((prev) => {
      return { ...prev, user: true };
    });
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
      interimResults: true,
    });
  };

  const handleStopListeningUser = async () => {
    setGlowingEffect((prev) => {
      return { ...prev, user: false };
    });
    SpeechRecognition.stopListening();

    try {
      const response = await axios.post(`${LOCAL_URL}/api/chat`, {
        transcript,
      });
      setAiResponse(response.data.content);
      speak(response.data.content);
      resetTranscript();
    } catch (error) {}
  };

  function speak(aiResponse) {
    setGlowingEffect((prev) => {
      return { ...prev, interviewer: true };
    });
    const utterance = new SpeechSynthesisUtterance(aiResponse);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[3];
    utterance.lang = "en-IN";
    utterance.onend = () => {
      setIsInterviewerSpeaking(false);
      setGlowingEffect((prev) => {
        return { ...prev, interviewer: false };
      });
    };
    speechSynthesis.speak(utterance);
    setIsInterviewerSpeaking(true);
  }

  return (
    <>
      {loading ? (
        <p className={interviewStyles.loading}>
          Interview Starting in 3..2..1..
        </p>
      ) : (
        <div className={interviewStyles.interviewLayout}>
          <div className={interviewStyles.interviewLHS}>
            <div
              className={`${interviewStyles.sectionBackground} ${interviewStyles.interviewerSection}`}
            >
              <p className={interviewStyles.sectionTitle}>Interviewer</p>
              <img
                src={qnAceInterviewer}
                alt="AI Interviewer"
                className={`${interviewStyles.interviewerProfile} ${
                  glowingEffect.interviewer === true
                    ? interviewStyles.glowingEffect
                    : ""
                }`}
              />
            </div>
            <div
              className={`${interviewStyles.sectionBackground} ${interviewStyles.intervieweeSection}`}
            >
              <p className={interviewStyles.sectionTitle}>You</p>
              <img
                src={qnAceInterviewee}
                alt="AI Interviewee"
                className={`${interviewStyles.intervieweeProfile} ${
                  glowingEffect.user === true
                    ? interviewStyles.glowingEffect
                    : ""
                }`}
              />
              <div className={interviewStyles.intervieweeControlButtonGroup}>
                <button
                  onClick={handleStartListeningUser}
                  className={`${interviewStyles.intervieweeControlButton}  ${
                    isInterviewerSpeaking
                      ? interviewStyles.intervieweeControlButtonInactive
                      : ""
                  }`}
                  // disabled={isInterviewerSpeaking}
                >
                  Start recording
                </button>
                <button
                  onClick={handleStopListeningUser}
                  className={`${interviewStyles.intervieweeControlButton} ${
                    isInterviewerSpeaking
                      ? interviewStyles.intervieweeControlButtonInactive
                      : ""
                  }`}
                  // disabled={isInterviewerSpeaking}
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
              <p className={interviewStyles.sectionContent}>{aiResponse}</p>
            </div>
            <div
              className={`${interviewStyles.sectionBackground} ${interviewStyles.qASection} ${interviewStyles.answerSection}`}
            >
              <p className={interviewStyles.sectionTitle}>Answer</p>
              <p className={interviewStyles.sectionContent}>{transcript}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

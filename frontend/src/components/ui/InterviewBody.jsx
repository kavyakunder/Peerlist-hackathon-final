import { useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function InterviewBody() {
  const [aiResponse, setAiResponse] = useState("");

  const handleStartListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
      interimResults: true,
    });
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition</span>;
  }

  function speak(aiResponse) {
    const utterance = new SpeechSynthesisUtterance(aiResponse);

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[1];
    utterance.lang = "en-IN";
    speechSynthesis.speak(utterance);
  }
  const handleStopListening = async () => {
    SpeechRecognition.stopListening();

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        transcript,
      });
      setAiResponse(response.data.content);
      speak(response.data.content);
      resetTranscript();
    } catch (error) {
      console.error("Error during conversation:", error);
    }
  };

  return (
    <div style={{ margin: "9rem" }}>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleStartListening}>Start</button>

      <button onClick={handleStopListening}>Stop</button>

      <p>User: {transcript}</p>

      <p>AI Response: {aiResponse}</p>
    </div>
  );
}

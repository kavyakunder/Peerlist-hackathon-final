import { useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// ---------------- Demo Voice recording -----------------------

export default function TestVoice() {
  const [aiResponse, setAiResponse] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
      interimResults: true,
    });
  };

  console.log("hi");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  console.log("listening", listening);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function speak(aiResponse) {
    console.log("speak", transcript);
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(aiResponse);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[1]; // Choose a specific voice
    utterance.lang = "en-IN";
    // Speak the text
    speechSynthesis.speak(utterance);
  }
  const stopListening = async () => {
    SpeechRecognition.stopListening();

    try {
      const response = await axios.post("/api/chat", { transcript });
      console.log("ressss", response);
      setAiResponse(response.data.content);
      speak(response.data.content);
      setQuestionCount(questionCount + 1);
      resetTranscript();
    } catch (error) {
      console.error("Error during conversation:", error);
    }
  };

  console.log("question count is", questionCount);

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button
        // onClick={() =>
        //   SpeechRecognition.startListening({
        //     continuous: true,
        //     interimResults: true,
        //   })
        // }
        onClick={startListening}
      >
        Start
      </button>

      {/* <button onClick={SpeechRecognition.startListening}>Start</button> */}
      <button onClick={stopListening}>Stop</button>
      {/*<button onClick={SpeechRecognition.stopListening}>Stop</button>*/}

      {/* <button onClick={resetTranscript}>Reset</button> */}
      <p>User: {transcript}</p>
      {/* </form> */}
      {/* <button onClick={speak}>AI voice</button> */}
      <p>AI Response: {aiResponse}</p>
    </div>
  );
}

import { useState, useEffect } from "react";

let speech;
if (window.webkitSpeechRecognition) {
  // eslint-disable-next-line
  const SpeechRecognition = webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = true;
  speech.interimResults = true; // Enable interim results
} else {
  speech = null;
}
const useVoice = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const listen = () => {
    if (isListening) {
      speech.stop();
    } else {
      setText("");
      speech.start();
    }
    setIsListening(!isListening);
  };

  useEffect(() => {
    if (!speech) {
      return;
    }

    speech.onresult = (event) => {
      let transcribedText = "";
      for (const result of event.results) {
        if (result.isFinal) {
          transcribedText += result[0].transcript;
        } else {
          transcribedText += result[0].transcript + " "; // Space for interim results
        }
      }
      setText(transcribedText);
    };
  }, []);

  return {
    text,
    isListening,
    listen,
    voiceSupported: speech !== null,
  };
};

export default useVoice;

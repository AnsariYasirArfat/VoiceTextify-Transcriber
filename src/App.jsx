import { useState } from "react";
import useVoice from "./useVoiceToText";

function App() {
  const { text, isListening, listen, voiceSupported } = useVoice();
  const [showStopButton, setShowStopButton] = useState(false);

  if (!voiceSupported) {
    return (
      <div className="app">
        <h1>
          Voice recognition is not supported by your browser, please re-try with
          a supported browser e.g. Chrome, Edge;
        </h1>
      </div>
    );
  }

  const startListening = () => {
    listen();
    setTimeout(() => {
      setShowStopButton(true); // Show the button after 2 seconds
    }, 2000);
  };
  const stopListening = () => {
    listen();
    setTimeout(() => {
      setShowStopButton(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen ">
      <header className="flex justify-center items-center p-10">
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios-glyphs/30/speech-to-text.png"
          alt="speech-to-text"
        />
        <h1 className="text-3xl font-semibold mb-4 ps-4">VoiceTextify</h1>
      </header>
      <section className="flex flex-col justify-center items-center">
        <div className="w-[500px] h-[100px] border p-4 rounded-lg shadow-md mb-4">
          <p className="text-gray-700 capitalize">{text}</p>
        </div>
        <div className="flex space-x-4">
          {isListening ? (
            <button
              className={`${
                showStopButton
                  ? "bg-red-500 px-4 py-2 text-white rounded-lg"
                  : "hidden"
              }`}
              onClick={stopListening}
            >
              Stop Listening
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={startListening}
            >
              Start Listening
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

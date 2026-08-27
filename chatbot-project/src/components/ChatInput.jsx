import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import LoadingSpinner from "../assets/loading-spinner.gif";
import "./chatInput.css";

function timeStamp() {
  return dayjs().format("h:mma");
}

export function ChatInput({ setChatMessages, chatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    //   const newChatMessages = [
    //     ...chatMessages,
    //     { message: inputText, sender: "user", id: crypto.randomUUID() },
    //   ];

    if (isLoading) return;

    setInputText("");
    setIsLoading(true);

    const userMessage = {
      message: inputText,
      sender: "user",
      id: crypto.randomUUID(),
      timeStamp: timeStamp(),
    };

    const loadingMessage = {
      message: <img className="loading-spinner" src={LoadingSpinner} />,
      sender: "robot",
      id: crypto.randomUUID(),
    };

    setChatMessages([...chatMessages, userMessage, loadingMessage]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      // ...newChatMessages,
      ...chatMessages,
      userMessage,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        timeStamp: timeStamp(),
      },
    ]);

    setInputText("");
    setIsLoading(false);
  }

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          } else if (e.key === "Escape") {
            setInputText("");
          }
        }}
      />
      <button className="send-button" onClick={sendMessage}>
        {isLoading ? "sending..." : "Send"}
      </button>
    </div>
  );
}

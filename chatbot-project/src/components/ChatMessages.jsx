import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function useAutoScroll(chatMessages) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return chatMessagesRef;
}

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.length > 0 ? (
        chatMessages.map((chatMessage, i) => {
          const { message, sender, timeStamp } = chatMessage;
          return (
            <ChatMessage
              key={i}
              message={message}
              sender={sender}
              timeStamp={timeStamp}
            />
          );
        })
      ) : (
        <p className="welcome-text">
          Welcome the chatbot project! Send a messge using the textbox bellow.
        </p>
      )}
    </div>
  );
}

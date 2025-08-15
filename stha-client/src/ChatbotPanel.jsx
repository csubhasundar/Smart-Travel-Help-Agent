import { useState } from "react";
import { Assistant } from "./assistants/googleai";
import { Chat } from "./chatcomponents/Chat/Chat";
import { Controls } from "./chatcomponents/Controls/Controls";
import { Loader } from "./chatcomponents/Loader/Loader";
import styles from "./ChatbotPanel.module.css";

const assistant = new Assistant();

export default function ChatbotPanel({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  function updateLastMessageContent(content) {
    setMessages(prevMessages =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages(prevMessages => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(content, messages);

      let isFirstChunk = false;

      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      addMessage({
        content: "Sorry! I can't understand your request. Please try again!",
        role: "system",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  return (
    <div className={styles.Panel}>
      <div className={styles.Header}>
        <img className={styles.Logo} src="/chatbot.png"/>
        <h2 className={styles.title}>STHA Chatbot</h2>
        <button onClick={onClose} className={styles.CloseBtn}>×</button>
      </div>

      {isLoading && <Loader />}

      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>

      <Controls onSend={handleContentSend} isDisabled={isLoading || isStreaming} />
    </div>
  );
}

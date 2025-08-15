import { useState } from "react";
import styles from "./FloatingChatButton.module.css";
import ChatbotPanel from "../ChatbotPanel"; // Your chatbot UI

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatbotPanel onClose={() => setIsOpen(false)} />}
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(true)}
      >
        <img src="/chatbot.png" alt="Travel Agent" />
      </button>
    </>
  );
}

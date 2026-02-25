import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HerbalChatbot.css";
import chatbotImg from "../assets/Home_Page/chatbot2.png";

const HerbalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Ayurvedic assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // UI ONLY — Chat History Sidebar (dummy titles for now)
  const [chatHistory] = useState([
    { id: 1, title: "Ayurveda Benefits" },
    { id: 2, title: "Tulsi Uses" },
    { id: 3, title: "Dosha Types" },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await res.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.answer || "Sorry, I couldn't find an answer.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Oops! Something went wrong.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      {/* SIDEBAR */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2 style={{ textAlign: "center" }}>Your Chats</h2>
          <hr></hr>
          <button className="new-chat-btn">+ New Chat</button>
          <input placeholder="Search chats..." className="chat-search" />
        </div>

        <div className="chat-history">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="chat-history-item">
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="herbal-chatbot">
        <motion.div
          className={`chatbot-container ${collapsed ? "collapsed" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* HEADER */}
          <div className="chatbot-header">
            <div className="header-left">
              <img src={chatbotImg} alt="bot" />
              <div>
                <h1>Herbal Chatbot</h1>
                <span className="online-status">● Online</span>
              </div>
            </div>
          </div>

          <>
            {/* CHAT BODY */}
            <div className="chatbot-content">
              <div className="chat-messages">
                <AnimatePresence>
                  {messages
                    .filter((msg) =>
                      msg.text.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .map((message) => (
                      <motion.div
                        key={message.id}
                        className={`message ${message.sender}-message`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="message-content">
                          <p>{message.text}</p>
                          <span className="message-time">
                            {message.timestamp?.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                  {loading && (
                    <motion.div
                      className="message bot-message"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="message-content typing-bubble">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* INPUT AREA */}
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Ask about Ayurvedic plants..."
                className="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />

              <button
                className="send-button"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || loading}
              >
                ➤
              </button>
            </div>
          </>
        </motion.div>
      </div>
    </div>
  );
};

export default HerbalChatbot;

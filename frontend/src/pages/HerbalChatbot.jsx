// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./HerbalChatbot.css";
// import chatbotImg from "../assets/Home_Page/chatbot2.png";

// const HerbalChatbot = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm your Ayurvedic assistant. How can I help you today?",
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);

//   const [inputValue, setInputValue] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [collapsed, setCollapsed] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // UI ONLY — Chat History Sidebar (dummy titles for now)
//   const [chatHistory] = useState([
//     { id: 1, title: "Ayurveda Benefits" },
//     { id: 2, title: "Tulsi Uses" },
//     { id: 3, title: "Dosha Types" },
//   ]);

//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const userMessage = {
//       id: messages.length + 1,
//       text: inputValue.trim(),
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: userMessage.text }),
//       });

//       const data = await res.json();

//       const botMessage = {
//         id: messages.length + 2,
//         text: data.answer || "Sorry, I couldn't find an answer.",
//         sender: "bot",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: messages.length + 2,
//           text: "Oops! Something went wrong.",
//           sender: "bot",
//           timestamp: new Date(),
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="chat-page">
//       {/* SIDEBAR */}
//       <div className="chat-sidebar">
//         <div className="sidebar-header">
//           <h2 style={{ textAlign: "center" }}>Your Chats</h2>
//           <hr></hr>
//           <button className="new-chat-btn">+ New Chat</button>
//           <input placeholder="Search chats..." className="chat-search" />
//         </div>

//         <div className="chat-history">
//           {chatHistory.map((chat) => (
//             <div key={chat.id} className="chat-history-item">
//               {chat.title}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MAIN CHAT AREA */}
//       <div className="herbal-chatbot">
//         <motion.div
//           className={`chatbot-container ${collapsed ? "collapsed" : ""}`}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* HEADER */}
//           <div className="chatbot-header">
//             <div className="header-left">
//               <img src={chatbotImg} alt="bot" />
//               <div>
//                 <h1>Herbal Chatbot</h1>
//                 <span className="online-status">● Online</span>
//               </div>
//             </div>
//           </div>

//           <>
//             {/* CHAT BODY */}
//             <div className="chatbot-content">
//               <div className="chat-messages">
//                 <AnimatePresence>
//                   {messages
//                     .filter((msg) =>
//                       msg.text.toLowerCase().includes(searchTerm.toLowerCase()),
//                     )
//                     .map((message) => (
//                       <motion.div
//                         key={message.id}
//                         className={`message ${message.sender}-message`}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <div className="message-content">
//                           <p>{message.text}</p>
//                           <span className="message-time">
//                             {message.timestamp?.toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                       </motion.div>
//                     ))}

//                   {loading && (
//                     <motion.div
//                       className="message bot-message"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                     >
//                       <div className="message-content typing-bubble">
//                         <div className="typing-indicator">
//                           <span></span>
//                           <span></span>
//                           <span></span>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <div ref={messagesEndRef} />
//               </div>
//             </div>

//             {/* INPUT AREA */}
//             <div className="chat-input-container">
//               <input
//                 type="text"
//                 placeholder="Ask about Ayurvedic plants..."
//                 className="chat-input"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyDown={handleKeyPress}
//               />

//               <button
//                 className="send-button"
//                 onClick={handleSendMessage}
//                 disabled={!inputValue.trim() || loading}
//               >
//                 ➤
//               </button>
//             </div>
//           </>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HerbalChatbot;
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown"; // ✅ NEW
import "./HerbalChatbot.css";
import chatbotImg from "../assets/Home_Page/chatbot2.png";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translate";
import axiosInstance from "../utils/axiosInstance";

const HerbalChatbot = () => {
  const { language } = useLanguage();
  const txt = t[language];

  const [messages, setMessages] = useState([
    { id: 1, text: txt.chatGreeting, sender: "bot", timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (!activeChatId) {
      setMessages([
        { id: 1, text: txt.chatGreeting, sender: "bot", timestamp: new Date() },
      ]);
    }
  }, [language]);

  const fetchChatHistory = async () => {
    try {
      const { data } = await axiosInstance.get("/chats");
      setChatHistory(data);
    } catch (err) {
      console.error("Failed to load chat history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  // ✅ FIXED — no longer creates empty chat in DB
  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([
      { id: 1, text: txt.chatGreeting, sender: "bot", timestamp: new Date() },
    ]);
  };

  const handleLoadChat = async (chatId) => {
    try {
      const { data } = await axiosInstance.get(`/chats/${chatId}`);
      setActiveChatId(data._id);
      setMessages(
        data.messages.map((msg, i) => ({
          id: i + 1,
          text: msg.text,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp),
        })),
      );
    } catch (err) {
      console.error("Failed to load chat:", err);
    }
  };

  const handleDeleteChat = async (e, chatId) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/chats/${chatId}`);
      setChatHistory((prev) => prev.filter((c) => c._id !== chatId));
      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([
          {
            id: 1,
            text: txt.chatGreeting,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

  const saveMessage = async (chatId, sender, text) => {
    try {
      await axiosInstance.post(`/chats/${chatId}/message`, { sender, text });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // ✅ Auto-create chat only when first message is sent
    let currentChatId = activeChatId;
    if (!currentChatId) {
      try {
        const { data } = await axiosInstance.post("/chats");
        currentChatId = data._id;
        setActiveChatId(data._id);
        setChatHistory((prev) => [data, ...prev]);
      } catch (err) {
        console.error("Failed to create chat:", err);
        return;
      }
    }

    const userMessage = {
      id: messages.length + 1,
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    await saveMessage(currentChatId, "user", userMessage.text);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.text, language }),
      });

      const data = await res.json();
      const botText = data.answer || "Sorry, I couldn't find an answer.";

      const botMessage = {
        id: messages.length + 2,
        text: botText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      await saveMessage(currentChatId, "bot", botText);
      fetchChatHistory(); // refresh sidebar title
    } catch (err) {
      const errorText = "Oops! Something went wrong.";
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: errorText,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      await saveMessage(currentChatId, "bot", errorText);
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

  const filteredHistory = chatHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="chat-page">
      {/* SIDEBAR */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h2 style={{ textAlign: "center" }}>{txt.yourChats}</h2>
          <hr />
          <button className="new-chat-btn" onClick={handleNewChat}>
            {txt.newChat}
          </button>
          <input
            placeholder={txt.searchChats}
            className="chat-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="chat-history">
          {loadingHistory ? (
            <p style={{ padding: "1rem", color: "#aaa", fontSize: "0.85rem" }}>
              Loading...
            </p>
          ) : filteredHistory.length === 0 ? (
            <p style={{ padding: "1rem", color: "#aaa", fontSize: "0.85rem" }}>
              No chats yet. Start a new one!
            </p>
          ) : (
            filteredHistory.map((chat) => (
              <div
                key={chat._id}
                className={`chat-history-item ${activeChatId === chat._id ? "active" : ""}`}
                onClick={() => handleLoadChat(chat._id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chat.title}
                </span>
                <button
                  onClick={(e) => handleDeleteChat(e, chat._id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#e74c3c",
                    cursor: "pointer",
                    fontSize: "1rem",
                    marginLeft: "8px",
                    flexShrink: 0,
                  }}
                  title="Delete chat"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="herbal-chatbot">
        <motion.div
          className="chatbot-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* HEADER */}
          <div className="chatbot-header">
            <div className="header-left">
              <img src={chatbotImg} alt="bot" />
              <div>
                <h1>{txt.chatbotTitle}</h1>
                <span className="online-status">● {txt.online}</span>
              </div>
            </div>
          </div>

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
                        {/* ✅ markdown rendering for bot messages */}
                        {message.sender === "bot" ? (
                          <div className="bot-markdown">
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                          </div>
                        ) : (
                          <p>{message.text}</p>
                        )}
                        <span className="message-time">
                          {new Date(message.timestamp).toLocaleTimeString([], {
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
              ref={inputRef}
              type="text"
              placeholder={txt.chatPlaceholder}
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
        </motion.div>
      </div>
    </div>
  );
};

export default HerbalChatbot;

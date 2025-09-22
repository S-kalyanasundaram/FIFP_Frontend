import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react"; // or any icon you like
import Suggestions from "./components/Suggestions";
import {
  askQuestion,
  getSessions,
  getChatHistory,
  loadData,
} from "./api/api";

// Function to get USER_ID dynamically from localStorage or query params
const getUserId = () => {
  // Try localStorage first
  let id = localStorage.getItem("userID");

  // If not found in localStorage, try query params
  if (!id) {
    const params = new URLSearchParams(window.location.search);
    id = params.get("userID");
    if (id) {
      localStorage.setItem("userID", id); // save for next time
    }
  }

  return id || "userID"; // fallback default ID
};

function App() {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const USER_ID = getUserId(); // dynamically determined

  // Example suggestions (can be dynamic later)
  const suggestions = [
    "Show my last 3 investments",
    "What’s my risk profile?",
    "How much should I save monthly?",
    "Summarize my financial status",
  ];

  useEffect(() => {
    if (USER_ID) {
      loadData(USER_ID);
      fetchSessions();
    }
  }, [USER_ID]);

  const fetchSessions = async () => {
    const res = await getSessions(USER_ID);
    setSessions(res.data.sessions);
  };

  const handleSend = async (text) => {
    const newMsg = { sender: "user", text };
    setMessages((prev) => [...prev, newMsg]);
    setLoading(true); // start loading

    try {
      const res = await askQuestion({
        user_id: USER_ID,
        question: text,
        session_id: sessionId,
      });

      if (res.data.answer) {
        setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
        setSessionId(res.data.session_id);
        fetchSessions();
      }
    } finally {
      setLoading(false); // stop loading
    }
  };

  const loadHistory = async (sid) => {
    setSessionId(sid);
    const res = await getChatHistory(USER_ID, sid);
    const hist = res.data.history
      .map((c) => [
        { sender: "user", text: c.question },
        { sender: "bot", text: c.answer },
      ])
      .flat();
    setMessages(hist);
  };

  const handleNewChat = () => {
    setSessionId(null);
    setMessages([]);
  };

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <Sidebar
          sessions={sessions}
          onSelect={loadHistory}
          active={sessionId}
          userId={USER_ID}
          refresh={fetchSessions}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
        />
      )}

      <div className="flex flex-col flex-1">
        <ChatWindow messages={messages} loading={loading} />

        {/* Suggestions Section (only when chat is empty) */}
        {!messages.length && (
          <Suggestions
            suggestions={suggestions}
            onSelect={(q) => handleSend(q)}
          />
        )}

        <ChatInput onSend={handleSend} />
      </div>

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            fixed top-6 left-6 
            bg-gray-800 hover:bg-gray-700 
            text-white 
            w-12 h-12 
            rounded-full 
            flex items-center justify-center 
            shadow-lg 
            transition-colors duration-200
            z-50
          "
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
}

export default App;

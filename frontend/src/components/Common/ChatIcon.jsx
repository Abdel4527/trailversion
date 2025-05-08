import React, { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import AIChatbot from "../Layout/AIChatbot";

const ChatIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-emerald-600 transition"
        onClick={toggleChat}
      >
        <BsChatDots size={24} />
      </div>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={toggleChat}
            >
              ✖
            </button>
            <AIChatbot />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatIcon;
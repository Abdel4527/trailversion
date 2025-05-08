import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatWidget = () => {
  const [messages, setMessages] = useState([]); // State to store chat history
  const [userMessage, setUserMessage] = useState(""); // State for user input
  const [sessionId, setSessionId] = useState(null); // Store session ID
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat visibility

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Step 1: Create a chat session
        const chatSession = await axios.post(
          "https://agentivehub.com/api/chat/session",
          {
            "api_key": "9796b1bb-e60c-495c-bbe7-73413c32338c",
             "assistant_id": "c072b85a-2f8d-4585-a270-c2ba2c0df0ab",
            }
        );

        setSessionId(chatSession.data.session_id); // Save session ID
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, []);

  const sendMessage = async () => {
    if (!userMessage.trim()) return; // Prevent sending empty messages

    // Add the user's message to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);

    try {
      // Step 2: Send a message to the chat assistant
      const chatRequest = {
        api_key: "9796b1bb-e60c-495c-bbe7-73413c32338c",
        session_id: sessionId,
        type: "custom_code",
        assistant_id: "c072b85a-2f8d-4585-a270-c2ba2c0df0ab",
        messages: [{ role: "user", content: userMessage }],
      };

      const chat = await axios.post(
        "https://agentivehub.com/api/chat",
        chatRequest
      );

      // Add the chatbot's response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: chat.data.content },
      ]);

      setUserMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      {/* Floating Button to Open Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg text-lg"
        >
          💬
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-[400px] h-[600px] flex flex-col">
          {/* Header with Close Button */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="font-bold text-lg">Chat Bot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl font-bold"
            >
              ✖
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 flex-1 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-gray-700"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            ))}
          </div>

          {/* Input and Send Button */}
          <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

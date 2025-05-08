import React, { useState } from "react";
import axios from "axios";

const AIChatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter a valid question.");
      return;
    }

    setError("");
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/openai/generate`,
        { prompt }
      );
      setResponse(res.data.answer);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me about our products..."
          className="w-full p-3 border rounded-lg mb-2"
          rows="4"
        ></textarea>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {loading && (
        <div className="text-center text-gray-500 mb-4">Fetching response...</div>
      )}
      {response && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold mb-2">Response:</h2>
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { FaRobot, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingDots = () => (
  <div className="flex space-x-2 mt-2">
    {[0, 1, 2].map((dot) => (
      <motion.div
        key={dot}
        className="w-2 h-2 bg-teal-500 rounded-full"
        animate={{ y: ["0%", "-50%", "0%"] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.2 }}
      />
    ))}
  </div>
);

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = {
      text: "Hello! I'm your friendly Phi3 assistant. How can I help you today?",
      sender: 'bot',
    };
    setMessages([welcomeMessage]);
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const userMessage = { text: inputMessage, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        const response = await axios.post('/chat', { message: inputMessage });
        const botMessage = { text: response.data.reply, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [...prevMessages, { text: "Sorry, I encountered an error. Please try again.", sender: 'bot' }]);
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-center h-16 bg-teal-600 text-white font-bold text-xl shadow-md">
        <FaRobot className="mr-2" />
        <span>Phi3 Small Chatbot</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg shadow-md ${
                  message.sender === 'user'
                    ? 'bg-teal-500 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <div className="flex items-center mb-2">
                  {message.sender === 'user' ? (
                    <FaUser className="mr-2 text-white" />
                  ) : (
                    <FaRobot className="mr-2 text-teal-500" />
                  )}
                  <span className="font-semibold">
                    {message.sender === 'user' ? 'You' : 'Phi3'}
                  </span>
                </div>
                <p className="whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-center">
            <LoadingDots />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white shadow-md">
        <div className="flex items-center max-w-4xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg focus:outline-none hover:bg-teal-600 transition-colors duration-300"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
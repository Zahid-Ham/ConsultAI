import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import './ChatWithAI.css';

const ChatWithAI = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`chat-ai-float ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <FaRobot className="chat-ai-icon" />
      {hovered && <span className="chat-ai-text">Chat with AI</span>}
    </div>
  );
};

export default ChatWithAI;
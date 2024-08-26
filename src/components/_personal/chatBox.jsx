"use client"
import { SendData } from "@/service/Api-service/apiChatbox";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChatBox() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Array to store messages

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async() => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]); // Add the new message to the array
      setMessage(""); // Clear the input field after sending the message
      try {
        const data = {role: "", content: message, rule: ""}
        const response = await SendData(data);
        if(response.statusCode === 200 || response.statusCode === 201) {
          toast.success(response.message);
        }
        else {
          toast.error(response.errorMessages)
        }
      } catch (error) {
        console.log(error);
        toast.error('Send failed');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 left-10">
      <div
        className="cursor-pointer p-4 bg-blue-300 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        <MessageCircleMore />
      </div>

      {isChatOpen && (
        <div className="bg-white rounded-lg shadow-lg mt-4 w-96" style={{ height: "30rem" }}>
          <div className="bg-primary p-2 rounded-t-lg text-white flex justify-between items-center">
            <span>Chat với chúng tôi</span>
            <button onClick={toggleChat}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <div className="p-4 flex flex-col justify-between h-full">
            <div className="mb-4 flex-grow overflow-y-auto">
              {messages.map((msg, index) => (
                <p key={index} className={`p-2 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100"}`}>
                  {msg.text}
                </p>
              ))}
            </div>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm box-border"
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Listen for Enter key press
            />
          </div>
        </div>
      )}
    </div>
  );
}

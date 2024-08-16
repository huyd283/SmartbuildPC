import { MessageCircleMore } from "lucide-react";
import { useState } from "react";

export default function ChatBox() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 left-10">
      <div
        className="cursor-pointer p-4 bg-blue-300 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        {/* Box Chat */}
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
            <div className="mb-4 flex-grow">
              <p className="bg-gray-100 p-2 rounded-lg text-sm">
                Xin chào! Bạn cần hỗ trợ gì?
              </p>
            </div>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm box-border"
            />
          </div>
        </div>
      )}
    </div>
  );
}

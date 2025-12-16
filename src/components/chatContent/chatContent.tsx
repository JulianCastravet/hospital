import { Input, Avatar } from "antd";
import { useEffect, useRef } from "react";
import { getAvatarByUserId } from "../../utils/getAvatarByUserId";
import { User } from "../../types";

interface Message {
  createdAt: Date;
  text: string;
  senderId: string;
  receiverId: string;
}

interface Props {
  messages: Message[];
  currentUser: User;
  inputValue: string;
  setInputValue: (v: string) => void;
  sendMessage: () => void;
}

export const ChatContent: React.FC<Props> = ({
  messages,
  currentUser,
  inputValue,
  setInputValue,
  sendMessage,
}) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  let customKey = 0;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col max-h-[600px] border rounded-lg overflow-hidden">
      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[300px]"
        style={{
          backgroundImage: "url(/assets/1.png)",
          backgroundPosition: "center",
        }}
      >
        {!messages.length && (
          <span className="text-center">
            Your chat is empty. Please start a conversation.
          </span>
        )}
        {messages.map((mess) => {
          const isMine = mess.senderId === currentUser._id;
          return (
            <div
              key={new Date(mess.createdAt).getMilliseconds() + customKey++}
              className={`flex items-end gap-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              {!isMine && (
                <Avatar
                  size={32}
                  src={getAvatarByUserId(mess.senderId)}
                  className="flex-shrink-0"
                />
              )}

              <div
                className={`max-w-[60%] p-2.5 rounded-2xl shadow-sm break-words ${
                  isMine ? "bg-green-200 text-right" : "bg-white text-left"
                }`}
              >
                <div>{mess.text}</div>
                <div className="text-[10px] text-gray-500 mt-1">
                  {new Date(mess.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
              </div>

              {isMine && (
                <Avatar
                  size={32}
                  src={getAvatarByUserId(currentUser.avatarUrl)}
                  className="flex-shrink-0"
                />
              )}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="p-2 border-t bg-white">
        <Input
          type="text"
          placeholder="Send message"
          value={inputValue}
          onPressEnter={sendMessage}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

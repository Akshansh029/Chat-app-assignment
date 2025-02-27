import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, receiveMessage } from "../features/chat/chatSlice";
import { TextField, Button, CircularProgress, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import "../index.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messages = useSelector((state) => state.chat.messages);
  const emojiPickerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const chatWindow = document.querySelector(".h-96");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput("");
      setIsTyping(true);
      setTimeout(() => {
        dispatch(receiveMessage("Mock response is being sent."));
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };

  return (
    <div className="w-[350px] md:w-[500px] xl:w-[700px] mx-auto my-10 p-3 md:p-4 xl:p-6 bg-blue-200 border rounded-2xl shadow-lg scrollbar-custom">
      <div className="flex gap-2 items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Akshansh's Chat</h2>
        <div className="h-10 w-10 rounded-full border-blue-500 border-2">
          <img
            src="/Avatar.jpg"
            alt="Avatar.jpg"
            className="rounded-full object-contain"
          />
        </div>
      </div>
      <div className="h-96 overflow-y-auto p-4 mb-4 border-b-2 bg-[url('/bg.jpeg')] rounded-lg shadow-inner scrollbar-custom">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === "Akshansh" ? "justify-end" : "justify-start"
            } slide-up`}
          >
            <div
              className={`p-3 max-w-xs rounded-lg shadow-md ${
                msg.sender === "Akshansh"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <strong className="block">{msg.sender}</strong>
              <p>{msg.text}</p>
              <p
                className={`text-xs ${
                  msg.sender === "Akshansh" ? "text-gray-200" : "text-gray-800"
                } mt-1 text-right`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="p-3 max-w-xs rounded-lg bg-gray-200 text-gray-800 flex items-center">
              <CircularProgress size={20} color="inherit" className="mr-2" />
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md relative">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              height: "42px",
              fontSize: "16px",
              fontWeight: "600",
            },
          }}
        />
        <IconButton
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          sx={{ padding: "10px" }}
        >
          <EmojiEmotionsIcon />
        </IconButton>
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-16 right-16">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          sx={{
            backgroundColor: "#4a90e2",
            "&:hover": { backgroundColor: "#357ABD" },
            borderRadius: "10px",
            padding: "10px 20px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;

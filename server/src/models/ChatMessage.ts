import mongoose, { Schema } from "mongoose";

interface IChatMessage {
  text: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
}

export const ChatMessageSchema = new Schema<IChatMessage>({
  text: String,

  senderId: {
    type: String,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: String,
    ref: "User",
    required: true,
  },

  createdAt: { type: Date, default: Date.now, validate: (value: Date) => !isNaN(value.getTime()) },
});

export const ChatMessage = mongoose.model<IChatMessage>(
  "ChatMessage",
  ChatMessageSchema
);

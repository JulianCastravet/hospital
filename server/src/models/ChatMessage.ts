import mongoose, { Schema } from "mongoose";

interface ChatMessage {
  text: string;
  senderId: string;
  receiverId: string;
  // doctorId: string;
  // patientId: string;
  createdAt: Date;
}

export const ChatMessageSchema = new Schema<ChatMessage>({
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

  // doctorId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // patientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },

  createdAt: { type: Date, default: Date.now },
});

export const ChatMessage = mongoose.model<ChatMessage>(
  "ChatMessage",
  ChatMessageSchema
);

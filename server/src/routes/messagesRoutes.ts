import { Request, Response } from "express";
import { ChatMessage } from "../models/ChatMessage";

export const getUserMessages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { secondUserID } = req.query;

    const messages = await ChatMessage.find({ id, secondUserID }).sort({
      createdAt: 1,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error });
  }
};

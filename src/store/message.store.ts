import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getMessagesByPatientID } from "../api/messages";
import { MessageInstance } from "antd/es/message/interface";

type CustomMessage = {
  createdAt: Date;
  text: string;
  senderId: string;
  receiverId: string;
};

interface MessageStoreInterface {
  patientId: string;
  message: CustomMessage | null;
  messages: CustomMessage[];
  messagesLoading: boolean;
  setPatientId: (
    { patientId, doctorId }: { patientId: string; doctorId: string },
    message: MessageInstance
  ) => void;
  addMessage: (message: CustomMessage) => void;
}

export const useMessageStore = create<MessageStoreInterface>()(
  devtools(
    persist(
      (set) => {
        return {
          patientId: "",
          message: null,
          messages: [],
          messagesLoading: false,
          setPatientId: async ({ patientId: id, doctorId: docId }, message) => {
            set({ patientId: id, messagesLoading: true });
            const messages = await getMessagesByPatientID(
              { patientId: id, doctorId: docId },
              message
            );
            set((store) => ({
              ...store,
              messages,
              messagesLoading: false,
              message: store.messages.length
                ? store.messages[store.messages.length - 1]
                : null,
            }));
          },
          addMessage: (message) =>
            set((store) => ({
              ...store,
              messages: [...store.messages, message],
            })),
        };
      },

      { name: "MessageStore" }
    ),

    { name: "MessageStore" }
  )
);

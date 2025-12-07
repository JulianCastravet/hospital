import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { useMessageStore } from "../store/message.store";
import { useAuthStore } from "../store/auth.store";

interface WebSocketStoreInterface {
  socket: WebSocket | null;
  manualClose: boolean;
  connect: (url: string) => void;
  disconnect: () => void;
  WSMessage: (text: string) => void;
}

export const useWebSocketStore = create<WebSocketStoreInterface>()(
  devtools(
    (set, get) => {
      let reconnectTimeout: NodeJS.Timeout;

      const connect = (url: string) => {
        if (get().socket) return;

        const ws = new WebSocket(url);

        ws.onopen = () => {
          console.log("WS Connection opened");
        };

        ws.onmessage = (event) => {
          const parsed = JSON.parse(event.data);
          const msg = parsed.payload;

          const currentUser = useAuthStore.getState().user!;

          if (msg.senderId === currentUser._id) return;

          useMessageStore.getState().addMessage(msg);
        };

        ws.onerror = (error) => {
          console.error("WS Connection error:", error);
        };

        ws.onclose = (event) => {
          console.log("WS Connection closed", event.reason);
          set({ socket: null });
          // Reconnect only if not manually closed
          console.log("Reconnecting in 2s...");
          reconnectTimeout = setTimeout(() => connect(url), 2000);
        };

        set({ socket: ws, manualClose: false });
      };
      const disconnect = () => {
        const socket = get().socket;
        if (socket) {
          set({ manualClose: true });

          // Remove onclose listener to prevent reconnect
          socket.onclose = () => {};

          // Only close if the socket is OPEN or CONNECTING
          if (
            socket.readyState === WebSocket.OPEN ||
            socket.readyState === WebSocket.CONNECTING
          ) {
            socket.close(1000); // Normal closure
          }

          set({ socket: null });
        }
      };

      const WSMessage = (text: string) => {
        const socket = get().socket;
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(text);
        } else {
          console.warn("WS is not open. Message not sent.");
        }
      };

      return {
        socket: null,
        manualClose: false,
        connect,
        disconnect,
        WSMessage,
      };
    },
    { name: "WebSocketStore" }
  )
);

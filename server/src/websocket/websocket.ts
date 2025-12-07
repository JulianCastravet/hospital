import { Server } from "http";
import { WebSocketServer } from "ws";
import { ChatMessage } from "../models/ChatMessage";

let wss: WebSocketServer | null = null;

export const setupWebSocket = (server: Server) => {
  if (wss) {
    console.log("Websocket already running. Skipping...");
    return wss;
  }

  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("websocket connected");

    ws.on("message", (data) => {
      const parsedData = JSON.parse(data.toString());

      switch (parsedData.type) {
        case "message_type":
          manageMessageData(parsedData.payload);
          break;

        default:
          break;
      }

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString());
        }
      });
    });

    ws.on("close", () => {
      console.log("Websocket disconected");
    });

    ws.on("error", () => {
      console.log("some error happened with the websockets");
    });
  });
};
const manageMessageData = async (payload: any) => {
  try {
    const payloadDoc = await ChatMessage.create(payload);

    payloadDoc.save();
  } catch (error) {
    throw error;
  }
};

//to do:
// finish post to dabase
// send event to another user
// implement settings page to change my personal data as admin

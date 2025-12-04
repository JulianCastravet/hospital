import { useTitle } from "../../hooks/useTitle";
import { App, Avatar, Button, Drawer, List, Modal } from "antd";
import { useEffect, useState } from "react";

import { MessageOutlined } from "@ant-design/icons";
import { usePatientStore } from "../../store/patient.store";
import { User } from "../../types/user";
import { useMessageStore } from "../../store/message.store";
import { useAuthStore } from "../../store/auth.store";
import { useWebSocketStore } from "../../websocket/websocket";
import { ChatContent } from "../../components/chatContent/chatContent";

export const Messages = () => {
  useTitle("Messages");

  useEffect(() => {}, []);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [patient, setPatient] = useState<User | null>(null);
  const { patients } = usePatientStore();
  const { messages, setPatientId, addMessage } = useMessageStore();
  const { user } = useAuthStore();
  const { WSMessage } = useWebSocketStore();
  const { message } = App.useApp();

  const sendMessage = () => {
    if (!inputValue.trim().length) {
      return;
    }

    if (user && patient) {
      const message = {
        text: inputValue.trim(),
        senderId: user._id,
        receiverId: patient._id,
        createdAt: Date.now().toString(),
      };

      const payload = {
        type: "message_type",
        payload: message,
      };

      addMessage(message);
      WSMessage(JSON.stringify(payload));
    }

    setInputValue("");
  };

  const handleUserChat = (patient: User) => {
    setChatOpen(true);
    setSidebarOpen(false);

    setPatient(patient);
    setPatientId(
      { patientId: patient._id, doctorId: user?._id ?? "" },
      message
    );
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<MessageOutlined />}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 999,
        }}
        onClick={() => setSidebarOpen(true)}
      />

      <Drawer
        title="Patients"
        placement="right"
        width={320}
        onClose={() => setSidebarOpen(false)}
        open={sidebarOpen}
      >
        <List
          itemLayout="horizontal"
          dataSource={patients}
          renderItem={(patient) => (
            <List.Item
              onClick={() => handleUserChat(patient)}
              style={{
                cursor: "pointer",
                borderRadius: 6,
                padding: 12,
                transition: "0.2s",
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={patient.avatarUrl?.length ? patient.avatarUrl : null}
                  />
                }
                title={patient.name}
                description={"last message from array"}
              />
            </List.Item>
          )}
        />
      </Drawer>

      <Modal
        open={chatOpen}
        footer={false}
        onCancel={() => setChatOpen(false)}
        title={"Chat with " + patient?.name}
      >
        {user && (
          <ChatContent
            messages={messages}
            currentUserId={user._id}
            inputValue={inputValue}
            setInputValue={(e) => setInputValue(e)}
            sendMessage={sendMessage}
          />
        )}
      </Modal>
    </>
  );
};

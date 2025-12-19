import { App, Button, Checkbox, Col, Flex, Row } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useAuthStore } from "../../store/auth.store";
import { SaveFilled } from "@ant-design/icons";
import { useState } from "react";
import { ImageWithUpload } from "../../components/imageWithUpload/imageWithUpload";

export const Settings = () => {
  useTitle("Settings");

  const { user, loading, updateAuthUser, deleteAvatar } = useAuthStore();
  const { message } = App.useApp();

  const [options, setOptions] = useState<string[]>();

  const plainOptions = [
    "Dark Mode",
    "Patients",
    "Has Schedule",
    "Has Messages",
    "Has Medications",
    "Has Help",
    "Enable WebSocket",
  ];
  const onChange = (checkedValues: string[]) => {
    setOptions(checkedValues);
  };

  const saveData = () => {
    user &&
      updateAuthUser(user._id, { ...user, userSettings: options }, message);
  };

  const removeUserImage = (id: string) => {
    if (user) {
      deleteAvatar(id, message);
    }
  };

  return (
    <>
      <Flex>
        <Col>
          <Checkbox.Group
            options={plainOptions}
            defaultValue={user?.userSettings}
            onChange={onChange}
          />

          <Row className="mt-2">
            <Button type="primary" icon={<SaveFilled />} onClick={saveData}>
              Save
            </Button>
          </Row>
        </Col>
        <Col>
          <ImageWithUpload
            avatarUrl={user?.avatarUrl || ""}
            userId={user ? user._id : ""}
            removeImage={() => removeUserImage(user!._id)}
            loading={loading}
          />
        </Col>
      </Flex>
    </>
  );
};

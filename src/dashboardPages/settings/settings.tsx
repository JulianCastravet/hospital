import { App, Button, Checkbox, Col, Flex, Row, Select } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useAuthStore } from "../../store/auth.store";
import { SaveFilled } from "@ant-design/icons";
import { useState } from "react";
import { ImageWithUpload } from "../../components/imageWithUpload/imageWithUpload";
import { UserRole } from "../../types/user";

export const Settings = () => {
  useTitle("Settings");

  const { user, loading, updateAuthUser, deleteAvatar } = useAuthStore();
  const { message } = App.useApp();

  const [options, setOptions] = useState<string[]>();
  const [role, setRole] = useState<UserRole>(user?.role!);

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
      updateAuthUser(
        user._id,
        { ...user, userSettings: options, role },
        message
      );
  };

  const removeUserImage = (id: string) => {
    if (user) {
      deleteAvatar(id, message);
    }
  };

  const roleOptions = [
    { value: "patient", label: "Patient" },
    { value: "doctor", label: "Doctor" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <>
      <Flex>
        <Col>
          <Checkbox.Group
            options={plainOptions}
            defaultValue={user?.userSettings}
            onChange={onChange}
          />

          <Select
            options={roleOptions}
            value={role}
            onChange={(v) => setRole(v)}
          ></Select>

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

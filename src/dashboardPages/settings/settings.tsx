import { App, Button, Checkbox, Row } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useAuthStore } from "../../store/auth.store";
import { SaveFilled } from "@ant-design/icons";
import { useState } from "react";
import { useUserStore } from "../../store/user.store";
import { ImageWithUpload } from "../../components/imageWithUpload/imageWithUpload";

export const Settings = () => {
  useTitle("Settings");

  const { user, setOption, loading } = useAuthStore();
  const { updateUser, deleteAvatar } = useUserStore();
  const { message } = App.useApp();

  const [options, setOptions] = useState<string[]>([]);

  const plainOptions = [
    "Dark Mode",
    "Patients",
    "Has Schedule",
    "Has Messages",
    "Has Medications",
    "Has Help",
  ];
  const onChange = (checkedValues: string[]) => {
    setOption(checkedValues);
    setOptions(checkedValues);
  };

  const saveData = () => {
    user &&
      updateUser(
        { id: user._id, data: { ...user, userSettings: options } },
        message
      );
  };

  const removeUserImage = (id: string) => {
    if (user) {
      deleteAvatar(id, message);
    }
  };

  return (
    <>
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
      <ImageWithUpload
        avatarUrl={user?.avatarUrl ? user.avatarUrl : ""}
        userId={user ? user._id : ""}
        removeImage={() => removeUserImage(user ? user._id : "")}
        loading={loading}
      />
    </>
  );
};

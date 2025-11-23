import { App, Button, Checkbox, Row } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useAuthStore } from "../../store/auth.store";
import { SaveFilled } from "@ant-design/icons";
import { useState } from "react";
import { useUserStore } from "../../store/user.store";

export const Settings = () => {
  useTitle("Settings");

  const { user, setOption } = useAuthStore();
  const { updateUser } = useUserStore();
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
    </>
  );
};

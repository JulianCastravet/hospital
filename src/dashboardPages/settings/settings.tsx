import { Checkbox } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useAuthStore } from "../../store/auth.store";

export const Settings = () => {
  useTitle("Settings");

  const { user, setOption } = useAuthStore();

  const plainOptions = [
    "Dark Mode",
    "Patients",
    "Has Schedule",
    "Has Messages",
    "Has Medications",
    "Has Help",
  ];
  const onChange = (checkedValues: unknown[]) => {
    setOption(checkedValues as string[]);
  };

  return (
    <>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={user?.userSettings}
        onChange={onChange}
      />
    </>
  );
};

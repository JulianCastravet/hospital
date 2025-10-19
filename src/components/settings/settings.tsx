import { Checkbox, GetProp } from "antd";
import { useTitle } from "../../hooks/useTitle";
import userSettings from "../../store/userSettings.store";

export const Settings = () => {
  useTitle("Settings");

  const { userOptions, setOption } = userSettings();

  const plainOptions = ["Apple", "Pear", "Orange"];
  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues: unknown[]
  ) => {
    setOption(checkedValues as string[]);
  };

  return (
    <>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={userOptions}
        onChange={onChange}
      />
    </>
  );
};

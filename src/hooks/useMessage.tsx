import { message } from "antd";
import { AlertFilled } from "@ant-design/icons";

export const UseMessage = () => {
  const [messageAPI, contextMessage] = message.useMessage();

  const success = () => {
    messageAPI.open({
      type: "success",
      content: "Data loaded successfully! :)",
      icon: <AlertFilled color="green" />,
    });
  };
  const error = () => {
    messageAPI.open({
      type: "error",
      content: "Something wrong happened! :(",
      icon: <AlertFilled color="red" />,
    });
  };
  const warning = () => {
    messageAPI.open({
      type: "warning",
      content: "There are some problems. Please check again! :|",
      icon: <AlertFilled color="orange" />,
    });
  };

  return { success, error, warning, contextMessage };
};

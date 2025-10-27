import { Button, Checkbox, Flex, Form, Input } from "antd";
import { FooterComponent } from "../components/footer/footerComponent";
import { HeaderComponent } from "../components/header/headerComponent";
import { useTitle } from "../hooks/useTitle";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { userLoginRequest } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { CSSProperties } from "react";

export const SignIn = () => {
  useTitle("Hospital - Sign In");
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserState } = useAuth();

  const onSubmit = async (values: any) => {
    const data = await userLoginRequest(values);
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUserState(data.user);
      navigate("/dashboard/overview");
    }
  };

  const style: CSSProperties = {
    width: "50%",
    height: "calc(100vh - 130px)",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: "30px",
    textAlign: "center",
  };

  const contentStyle: CSSProperties = {
    width: "100vw",
    backgroundImage:
      'url("https://i.pinimg.com/736x/ca/5f/ae/ca5faec29743ad86b0b67ae03243187f.jpg")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <HeaderComponent />
      <Content style={contentStyle}>
        <Flex className="columns-2">
          <div style={style}>
            Please sign in to see the full potential of the nextGen Hospital
            Dashboard
          </div>
          <div style={style}>
            <Form
              name="login"
              initialValues={{ remember: true }}
              style={{ maxWidth: 360 }}
              onFinish={onSubmit}
            >
              <Form.Item
                name="mail"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="/">Forgot password</a>
                </Flex>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Log in
                </Button>
                or <a href="/sign-up">Register now!</a>
              </Form.Item>
            </Form>
          </div>
        </Flex>
      </Content>
      <FooterComponent />
    </>
  );
};

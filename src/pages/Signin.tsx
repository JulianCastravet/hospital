import { Button, Checkbox, Flex, Form, Input } from "antd";
import { FooterComponent } from "../components/footer/footerComponent";
import { HeaderComponent } from "../components/header/headerComponent";
import { useTitle } from "../hooks/useTitle";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "../context/authContext";

export const SignIn = () => {
  useTitle("Sign In - Hospital");
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const onSubmit = (values: any) => {
    const { password, mail } = values;

    const usersLS: User[] = JSON.parse(
      window.localStorage.getItem("users") ?? "[]"
    );

    if (usersLS.length) {
      const user = usersLS.find((user) => user.email === mail);
      if (!user) {
        alert("user not found");
      }
      if (user?.email === mail && user?.password !== password) {
        alert("Wrong password! :(");
      }
      if (user?.email === mail && user?.password === password) {
        setUser(user);
        userLoggedIn();
        navigate("/dashboard");
      }
    }
  };

  const userLoggedIn = () => {
    const ls = window.localStorage;
    if (!ls.getItem("isAuthenticated")) {
      ls.setItem("isAuthenticated", JSON.stringify(true));
    }
  };
  return (
    <>
      <HeaderComponent />
      <Content>
        <Flex>
          <div>some content</div>
          <div>
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

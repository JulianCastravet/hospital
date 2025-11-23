import { App, Button, Checkbox, Flex, Form, Input } from "antd";
import { FooterComponent } from "../components/footer/footerComponent";
import { HeaderComponent } from "../components/header/headerComponent";
import { useTitle } from "../hooks/useTitle";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";

export const SignIn = () => {
  useTitle("Hospital - Sign In");
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error, user } = useAuthStore();
  const { message } = App.useApp();

  useEffect(() => {
    isAuthenticated && user && navigate("/dashboard/overview");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: any) => {
    login(values, message);
  };

  return (
    <>
      <HeaderComponent />

      <Content
        className="min-h-[calc(100vh-77px)] w-full relative"
        style={{
          backgroundImage: "url('/assets/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="
          relative z-10 
          w-full h-full 
          flex flex-col lg:flex-row
          "
        >
          <div
            className="
            w-full lg:w-1/2 
            flex items-center justify-center
            px-6 lg:px-12 
            text-white text-center
          
            "
          >
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-semibold mb-6 drop-shadow-xl">
                Join the Mission
              </h1>

              <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
                Sign in and access the
                <strong>Mars Advanced Medical Center</strong> — the first
                interplanetary system designed to protect and monitor human life
                on the Red Planet.
              </p>
            </div>
          </div>

          <div
            className="
            w-full lg:w-1/2
            flex items-center justify-center
            px-6 lg:px-12
              backdrop-blur-md min-h-[calc(100vh-141px)]
            "
          >
            <div
              className="
              w-full max-w-sm 
               text-white p-8 rounded-xl 
              "
            >
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
              >
                <Form.Item
                  name="mail"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid Email address!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    className="!bg-white/10 !text-white"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    className="!bg-white/10 !text-white placeholder-white"
                  />
                </Form.Item>

                <Form.Item>
                  <Flex justify="space-between">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox className="text-gray-300">Remember me</Checkbox>
                    </Form.Item>

                    <a href="/" className="text-red-300 hover:text-red-400">
                      Forgot password?
                    </a>
                  </Flex>
                </Form.Item>

                <Form.Item className="mt-6">
                  <Button
                    block
                    type="primary"
                    loading={loading}
                    disabled={loading}
                    htmlType="submit"
                    className="!py-2 !h-auto !text-lg !rounded-lg"
                  >
                    Sign In
                  </Button>

                  {error && (
                    <div className="mt-3 text-center text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="mt-4 text-center text-gray-300">
                    Or{" "}
                    <a
                      href="/sign-up"
                      className="text-red-400 hover:text-red-500"
                    >
                      Register now!
                    </a>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Content>

      <FooterComponent />
    </>
  );
};

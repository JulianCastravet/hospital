import { CSSProperties, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { FooterComponent } from "../components/footer/footerComponent";
import { HeaderComponent } from "../components/header/headerComponent";
import { useTitle } from "../hooks/useTitle";
import { App, Button, DatePicker, Form, Radio, Select } from "antd";
import Input from "antd/es/input/Input";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useUserStore } from "../store/user.store";
import { NewUser } from "../types/user";
import { useNavigate } from "react-router-dom";

const doctorSpecialities = [
  { label: "ORL", value: "orl" },
  { label: "Cardiologist", value: "cardiologist" },
  { label: "Neurologist", value: "neurologist" },
  { label: "Dermatologist", value: "dermatologist" },
  { label: "Pediatrician", value: "pediatrician" },
  { label: "Oncologist", value: "oncologist" },
  { label: "Psychiatrist", value: "psychiatrist" },
  { label: "Endocrinologist", value: "endocrinologist" },
  { label: "Ophthalmologist", value: "ophthalmologist" },
  { label: "Gynecologist", value: "gynecologist" },
  { label: "Urologist/Andrologist", value: "urandro" },
];

export const SignUp = () => {
  useTitle("Hospital - Sign Up");
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { addUser } = useUserStore();
  const navigate = useNavigate();
  const [user, setUser] = useState<NewUser>({
    name: "",
    email: "",
    phone: "",
    password: "",
    specialization: "",
    type: "",
    dateOfBirth: "",
    gender: "",
    formattedAddress: "",
  });

  const onSubmit = (user: NewUser) => {
    addUser(user, message);
    resetForm();
    navigate("/sign-in");
  };

  const resetForm = () => {
    form.resetFields();
  };

  const contentStyle: CSSProperties = {
    width: "auto",
    height: "95vh",
    overflow: "hidden",
    backgroundImage:
      'url("https://cdn.mos.cms.futurecdn.net/FVBZ2EBSRXJA2q7BGKgjY5.jpg")',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: " cover",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <HeaderComponent />
      <Content style={contentStyle}>
        <Form onFinish={onSubmit} form={form}>
          <Form.Item
            name={"type"}
            label="Type"
            rules={[{ required: true, message: "Please select type of user!" }]}
          >
            <Radio.Group
              value={user?.type}
              onChange={(e) => setUser({ ...user, type: e.target.value })}
            >
              <Radio value="guest">Guest</Radio>
              <Radio value="doctor">Doctor</Radio>
            </Radio.Group>
          </Form.Item>

          {user.type === "doctor" && (
            <Form.Item label="Speciality" required name="specialization">
              <Select
                style={{ width: 250 }}
                onChange={(e) =>
                  setUser({ ...user, specialization: e.target?.value })
                }
                options={doctorSpecialities}
              />
            </Form.Item>
          )}
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              type="text"
              placeholder="John Doe"
            />
          </Form.Item>
          <Form.Item name="gender" label="Gender" required>
            <Select>
              <Select.Option key={"male"}>Male</Select.Option>
              <Select.Option key={"female"}>Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[
              { required: true, message: "Please select your Date of Birth!" },
            ]}
          >
            <DatePicker format={"DD/MM/YYYY"} className="w-full" />
          </Form.Item>

          <Form.Item label="Phone" required name="phone">
            <Input type="phone" placeholder="+37300000000" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined />}
              type="mail"
              placeholder="johndoe@mail.com"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <FooterComponent />
    </>
  );
};

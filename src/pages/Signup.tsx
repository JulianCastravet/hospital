import { CSSProperties, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { FooterComponent } from "../components/footer/footerComponent";
import { HeaderComponent } from "../components/header/headerComponent";
import { useTitle } from "../hooks/useTitle";
import { App, Button, DatePicker, Form, Radio, Select } from "antd";
import Input from "antd/es/input/Input";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
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
    role: "patient",
    specialization: "",
    dateOfBirth: "",
    avatarUrl: "",
    gender: "",
    formattedAddress: "",
    userSettings: [],
  });

  const [visible, setVisible] = useState<boolean>(false);

  const onSubmit = async (user: NewUser) => {
    try {
      await addUser(user, message);
      resetForm();
      navigate("/sign-in");
    } catch (error) {
      message.error("Ups, something happened");
    }
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
            name={"role"}
            label="Role"
            rules={[{ required: true, message: "Please select user role!" }]}
          >
            <Radio.Group
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <Radio value="patient">Patient</Radio>
              <Radio value="doctor">Doctor</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>

          {user.role === "doctor" && (
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
            rules={[
              { required: true, message: "Please input your Password!" },
              { min: 6, message: "At least 6 characters" },
            ]}
          >
            <Input
              type={visible ? "text" : "password"}
              prefix={<LockOutlined />}
              placeholder="Password"
              suffix={
                visible ? (
                  <EyeTwoTone onClick={() => setVisible(false)} />
                ) : (
                  <EyeInvisibleOutlined onClick={() => setVisible(true)} />
                )
              }
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

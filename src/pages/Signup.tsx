import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import { FooterComponent } from "../components/footer/footerComponent";
import { HeaderComponent } from "../components/header/headerComponent";
import { useTitle } from "../hooks/useTitle";
import { Button, DatePicker, Flex, Form, Radio, Select } from "antd";
import Input from "antd/es/input/Input";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useUser } from "../hooks/useUser";
import { User } from "../context/authContext";

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

  useTitle("Sign Up - Hospital");

  const [date, setDate] = useState<Date>(new Date());
  const [form]  = Form.useForm();
  
  const { user, setUser } = useUser();


  const onDateChange = (date_: any, dateString: any) => {
    setDate(new Date(dateString));
  };

  const onSubmit = (values: any) => {
    //modify from dayjs to date obj
    values.dateOfBirth = new Date(date).toLocaleDateString();

    addToStorage(values);

    resetForm()
  };

  const addToStorage = (user: User) => {
    const ls = window.localStorage;

    if (!ls.getItem("users")) {
      ls.setItem("users", JSON.stringify([]));
    }
    const array: User[] = JSON.parse(ls.getItem("users") ?? "[]");
    array.push(user);
    const stringUsers = JSON.stringify(array);
    ls.setItem("users", stringUsers);
  };


  const resetForm = ()=>{
    form.resetFields()
  }

  return (
    <>
      <HeaderComponent />
      <Content>
        <Flex>
          <Form onFinish={onSubmit} form={form}>
            <Form.Item
              name={"type"}
              label="Type"
              rules={[
                { required: true, message: "Please select type of user!" },
              ]}
            >
              <Radio.Group
                value={user.type}
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
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker onChange={onDateChange} />
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
              ]}
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
        </Flex>
      </Content>
      <FooterComponent />
    </>
  );
};

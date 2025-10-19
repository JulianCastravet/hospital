import { Button, DatePicker, Flex, Form, Input, Modal, Table } from "antd";
import { useUser } from "../../hooks/useUser";
import { useTitle } from "../../hooks/useTitle";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { User } from "../../context/authContext";

export const Patients = () => {
  useTitle("Patients");

  const { users, addUser } = useUser();

  const [form] = useForm();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const onDateChange = (date_: any, dateString: string | string[]) => {
    setDate(new Date(dateString === "string" ? dateString : dateString[0]));
  };

  const dataSource = [
    ...users
      .filter((user) => user.type === "guest")
      .map((i, key) => ({
        key,
        id: i.id,
        name: i.name,
        mail: i.email,
        phone: i.phone,
      })),
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <a href={`/dashboard/patients/${record.id}`}>{name}</a>
      ),
    },
    {
      title: "Mail",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const submitAddPatient = (user: User) => {
    user.id = Date.now();
    user.type = "guest";
    user.dateOfBirth = date.toLocaleString();
    addUser(user);
    form.resetFields();
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        sortDirections={["ascend", "descend"]}
      />
      <Flex>
        <Button type="primary" onClick={() => setModalOpen(!modalOpen)}>
          Add Patient
        </Button>
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(!modalOpen)}
          onOk={() => submitAddPatient(form.getFieldsValue())}
        >
          <Form
            onFinish={submitAddPatient}
            form={form}
            style={{ padding: "20px" }}
          >
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
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

import { Button, Flex, Form, Input, Modal, Table } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

export const Appointments = () => {
  useTitle("Appointments");
  const [open, setOpen] = useState<boolean>(false);

  const [form] = useForm();

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "appointmentId",
      key: "appointmentId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
  ];

  const dataSource = [
    {
      appointmentId: Date.now(),
      name: "user name",
      email: "user@test.com",
      phone: "123456677",
      diagnosis: "Blood checkup",
      key: 1,
    },
  ];
  const submitAppoinment = () => {
    const appointment = form.getFieldsValue();

    //send to backend
    form.resetFields();
    setOpen(!open);
  };

  return (
    <>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Button type="primary" onClick={() => setOpen(!open)}>
        Add Appointment
      </Button>

      <Modal
        open={open}
        onCancel={() => {
          setOpen(!open);
          form.resetFields();
        }}
        onOk={submitAppoinment}
      >
        <Flex>
          <Form
            form={form}
            style={{ padding: "20px" }}
            onFinish={submitAppoinment}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input type="text" placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input type="text" placeholder="johndoe@test.com" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input type="text" placeholder="+123456789" />
            </Form.Item>
            <Form.Item
              name="diagnosis"
              label="Diagnosis"
              rules={[{ required: true, message: "Please input diagnosis" }]}
            >
              <Input type="text" placeholder="ex: blood checkup" />
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
    </>
  );
};

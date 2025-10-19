import { Button, Flex, Form, Input, Modal, Table } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Appointment } from "../../data";
import { addAppointment, getAllAppointments } from "../../api/appointments";

export const Appointments = () => {
  useTitle("Appointments");
  const [open, setOpen] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>();

  useEffect(() => {
    getAllAppointments().then((apps) => {
      setAppointments(apps);
    });
  }, []);

  const [form] = useForm();

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
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

  const submitAppoinment = async () => {
    const appointment = form.getFieldsValue() as Appointment;
    addAppointment(appointment);

    const apps = await getAllAppointments();
    setAppointments(apps);

    form.resetFields();
    setOpen(!open);
  };

  return (
    <>
      <Table columns={columns} dataSource={appointments} rowKey={"_id"}></Table>
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

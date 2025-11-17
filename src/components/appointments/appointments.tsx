import { App, Button, Flex, Form, Input, Modal, Table } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from "../../api/appointments";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Appointment } from "../../types";

export const Appointments = () => {
  useTitle("Appointments");
  const [open, setOpen] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string>("");
  const { message } = App.useApp();

  useEffect(() => {
    getAllAppointments(message).then((apps) => {
      setAppointments(apps);
    });
  }, [message]);

  const [form] = useForm();
  const { confirm } = Modal;

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
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      render: (v: any) => (
        <Flex gap={12}>
          <EditFilled
            className="!text-gray-400 hover:text-orange-400! text-xl"
            onClick={() => handleEditRow(v)}
          />
          <DeleteFilled
            className="!text-gray-400 text-xl hover:text-red-600!"
            onClick={() => handleDeleteRow(v)}
          />
        </Flex>
      ),
    },
  ];

  const handleDeleteRow = (v: any) => {
    confirm({
      title: "Are you sure?",
      content: "This action is irreversible",
      icon: <DeleteFilled />,
      onOk: () =>
        deleteAppointment(v._id, message).then((apps: Appointment[]) =>
          setAppointments(apps)
        ),
    });
  };

  const handleEditRow = (v: any) => {
    setOpen(true);
    setIsEditMode(true);
    form.setFieldsValue(v);
    setAppointmentId(v._id);
  };

  const submitAppointment = async () => {
    try {
      await form.validateFields();

      const appointment = form.getFieldsValue() as Appointment;

      let result: Appointment[];

      if (isEditMode) {
        result = await updateAppointment(appointmentId, appointment, message);
      } else {
        result = await addAppointment(appointment, message);
      }

      // Close modal + reset form
      form.resetFields();
      setOpen(false);

      // Update list
      setAppointments(result);
    } catch (error) {}
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
          setOpen(false);
          form.resetFields();
        }}
        onOk={submitAppointment}
      >
        <Flex>
          <Form
            form={form}
            style={{ padding: "20px" }}
            onFinish={submitAppointment}
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

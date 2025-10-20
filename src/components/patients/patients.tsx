import { Button, DatePicker, Flex, Form, Input, Modal, Table } from "antd";
import { useUser } from "../../hooks/useUser";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  UserOutlined,
  MailOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { User } from "../../context/authContext";
import { deleteUser, getPatients } from "../../api/user";

export const Patients = () => {
  useTitle("Patients");

  const { addUser } = useUser();

  const [form] = useForm();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [patients, setPatients] = useState<User[]>();

  useEffect(() => {
    getPatients().then((pat) => setPatients(pat));
  }, []);

  const onDateChange = (date_: any, dateString: string | string[]) => {
    setDate(new Date(dateString === "string" ? dateString : dateString[0]));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <a href={`/dashboard/patients/${record._id}`}>{name}</a>
      ),
    },
    {
      title: "Mail",
      dataIndex: "email",
      key: "mail",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "",
      render: (v: any) => (
        <Flex gap={12}>
          <EditFilled
            style={{ color: "orange" }}
            onClick={() => handleEditRow(v)}
          />
          <DeleteFilled
            style={{ color: "red" }}
            onClick={() => handleDeleteRow(v)}
          />
        </Flex>
      ),
    },
  ];

  const submitAddPatient = async (user: User) => {
    user.type = "guest";
    user.dateOfBirth = date.toLocaleString();
    user.password = "guest";
    addUser(user);
    form.resetFields();

    // need to update the list with the last record added
    getPatients().then((patients) => setPatients(patients));
    setModalOpen(!modalOpen);
  };

  function handleEditRow(v: any): void {
    throw new Error("Function not implemented.");
  }

  function handleDeleteRow(data: any) {
    console.log(data)
    // create modal=> are you sure?
    deleteUser(data._id).then((patients) => setPatients(patients));
  }

  return (
    <>
      <Table
        dataSource={patients}
        columns={columns}
        sortDirections={["ascend", "descend"]}
        rowKey={"_id"}
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

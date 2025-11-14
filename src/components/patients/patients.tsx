import { App, Button, DatePicker, Flex, Form, Input, Modal, Table } from "antd";
import { useUser } from "../../hooks/useUser";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  UserOutlined,
  MailOutlined,
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { User } from "../../context/authContext";
import { deleteUser, getPatients } from "../../api/user";
import dayjs from "dayjs";

export const Patients = () => {
  useTitle("Patients");

  const { addUser, updateUser } = useUser();

  const [form] = useForm();
  const { confirm } = Modal;
  const { message } = App.useApp();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [patients, setPatients] = useState<User[]>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    getPatients(message).then((pat) => setPatients(pat));
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <a className="text-gray-500" href={`/dashboard/patients/${record._id}`}>
          {name}
        </a>
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
      render: (v: string) => <a href={`tel:${v}`}>{v}</a>,
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "",
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

  const submitAddPatient = async (editMode: boolean, user: User) => {
    if (!editMode) {
      user.type = "guest";
      user.password = "guest";
      addUser(user);
      form.resetFields();
      getPatients(message).then((patients) => setPatients(patients));
      setModalOpen(!modalOpen);
    } else {
      const id = form.getFieldValue("_id");

      updateUser(id, user);
      getPatients(message).then((patients) => setPatients(patients));

      setModalOpen(!modalOpen);
      setIsEditMode(false);
    }
  };

  function handleEditRow(v: any): void {
    setModalOpen(true);
    setIsEditMode(true);
    form.setFieldsValue({
      ...v,
      dateOfBirth: dayjs(v.dateOfBirth),
    });
  }

  function handleDeleteRow(data: any) {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: " This action is irreversible.",
      onOk() {
        deleteUser(data._id, message).then((patients) => setPatients(patients));
      },
    });
  }

  const handleModalClose = () => {
    setModalOpen(!modalOpen);
    setIsEditMode(false);
    form.resetFields();
  };

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
          onCancel={handleModalClose}
          onOk={() => submitAddPatient(isEditMode, form.getFieldsValue())}
        >
          <Form
            onFinish={() => submitAddPatient(isEditMode, form.getFieldsValue())}
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
              <DatePicker format={"DD/MM/YYYY HH:mm"} showTime />
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

import {
  App,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Table,
} from "antd";
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
import { getPatients } from "../../api/user";
import dayjs from "dayjs";
import { AddressMap } from "../addressMap/addressMap";
import { useUserStore } from "../../store/user.store";
import { User } from "../../types";
import { NewUser } from "../../types/user";

export const Patients = () => {
  useTitle("Patients");

  const { updateUser, deleteUser, addUser, users, getUsers } = useUserStore();
  const [form] = useForm();
  const { confirm } = Modal;
  const { message } = App.useApp();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [patients, setPatients] = useState<User[]>(
    users.filter((user) => user.type === "guest")
  );

  useEffect(() => {
    getUsers(message);
    return () => {};
  }, [getUsers, message]);

  useEffect(() => {
    setPatients(users.filter((user) => user.type === "guest"));
    return () => {};
  }, [users]);

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

  const submitAddPatient = async (editMode: boolean, values: any) => {
    const { address, name, dateOfBirth, phone, email, gender } = values;
    const user: NewUser = {
      name,
      dateOfBirth,
      gender,
      phone,
      formattedAddress: address,
      email,
      type: "guest",
      password: "guest",
    };

    form
      .validateFields([
        "address",
        "name",
        "gender",
        "dateOfBirth",
        "phone",
        "email",
      ])
      .then(() => {
        if (!editMode) {
          addUser(user, message);
          form.resetFields();
          setModalOpen(!modalOpen);
        } else {
          const id = form.getFieldValue("_id");

          updateUser({ id, data: { _id: id, ...user } }, message);

          setModalOpen(!modalOpen);
          setIsEditMode(false);
        }
      })
      .catch((error) => console.log(error));
  };

  function handleEditRow(v: any): void {
    setModalOpen(true);
    setIsEditMode(true);
    console.log(v);
    setTimeout(() => {
      form.setFieldsValue({
        ...v,
        dateOfBirth: dayjs(v.dateOfBirth),
        address: v.formattedAddress,
      });
    }, 0);
  }

  function handleDeleteRow(data: any) {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: " This action is irreversible.",
      onOk() {
        deleteUser(data._id, message);
      },
    });
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setIsEditMode(false);
    form.resetFields();
  };

  const handleMapValue = (v: string) => {
    form.setFieldsValue({ address: v });
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
          destroyOnHidden
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
            <Form.Item name="gender" label="Gender">
              <Select placeholder="Select Gender">
                <Select.Option key={"male"}>Male</Select.Option>
                <Select.Option key={"female"}>Female</Select.Option>
              </Select>
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
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <AddressMap onChange={handleMapValue} />
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

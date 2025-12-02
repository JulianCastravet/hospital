import {
  App,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TablePaginationConfig,
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
import dayjs from "dayjs";
import { useUserStore } from "../../store/user.store";
import { NewUser, User } from "../../types/user";
import { AddressMap } from "../../components/addressMap/addressMap";
import { usePatientStore } from "../../store/patient.store";
import { paginationConfig } from "../../configs";

export const Patients = () => {
  useTitle("Patients");

  const { updateUser, addUser } = useUserStore();
  const { getPatientsByPage, patients, totalPatients, deletePatient } =
    usePatientStore();
  const [form] = useForm();
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const PAGE_SIZE_COUNT = 10; //how many rows to fetch

  useEffect(() => {
    getPatientsByPage(
      { page: currentPage, pageSize: PAGE_SIZE_COUNT },
      message
    );
    return () => {};
  }, [message, getPatientsByPage, currentPage]);

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
      role: "patient",
      phone,
      formattedAddress: address,
      email,
      password: "guest",
      userSettings: [],
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

          const user: Partial<User> = {
            name,
            dateOfBirth,
            gender,
            phone,
            formattedAddress: address,
            email,
            role: "patient",
          };

          updateUser({ id, data: { _id: id, ...user } }, message);

          getPatientsByPage(
            { page: currentPage, pageSize: PAGE_SIZE_COUNT },
            message
          );

          setModalOpen(!modalOpen);
          setIsEditMode(false);
        }
      })
      .catch((error) => console.error(error));
  };

  function handleEditRow(v: any): void {
    setModalOpen(true);
    setIsEditMode(true);
    form.setFieldsValue({
      ...v,
      dateOfBirth: dayjs(v.dateOfBirth),
      address: v.formattedAddress,
    });
  }

  function handleDeleteRow(data: any) {
    modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: " This action is irreversible.",
      onOk() {
        deletePatient(data._id, message);
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

  const ppCongfig: TablePaginationConfig = {
    ...paginationConfig,
    onChange: (page: number) => {
      setCurrentPage(page);
    },
    total: totalPatients,
  };

  return (
    <>
      <Table
        dataSource={patients}
        columns={columns}
        sortDirections={["ascend", "descend"]}
        rowKey={"_id"}
        pagination={ppCongfig}
      />
      <Row className="mt-2">
        <Button type="primary" onClick={() => setModalOpen(!modalOpen)}>
          Add Patient
        </Button>
      </Row>

      {modalOpen && (
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
              <DatePicker format={"DD/MM/YYYY"} />
            </Form.Item>

            <Form.Item label="Phone" required name="phone">
              <Input type="phone" placeholder="+37300000000" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email" },
              ]}
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
      )}
    </>
  );
};

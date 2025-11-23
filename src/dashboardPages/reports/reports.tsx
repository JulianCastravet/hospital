import { App, Button, Checkbox, Flex, Modal, Row, Table } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import {
  addReport,
  updateReport,
  getAllReports,
  deleteReport,
} from "../../api/reports";
import { useForm } from "antd/es/form/Form";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { formatTime } from "../../utils/formatTime";
import { Report } from "../../types";
import ReportForm from "../../components/reportForm/reportForm";
import { Pill } from "../../components/pill/pill";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
  useTitle("Reports");
  const [form] = useForm();
  const { message, modal } = App.useApp();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllReports(message).then((reports) => setReports(reports));
  }, [message]);

  const [reports, setReports] = useState<Report[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [reportId, setReportId] = useState<string>("");

  const columns = [
    {
      key: "id",
      title: "Id",
      dataIndex: "_id",
    },
    {
      key: "signed",
      title: "Signed",
      dataIndex: "signed",
      render: (value: boolean) => <Checkbox disabled checked={value} />,
    },
    {
      key: "result",
      title: "Result",
      dataIndex: "result",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "collBy",
      title: "Coll. By",
      dataIndex: "collBy",
      render: (value: any) => <span>{formatTime(value)}</span>,
    },
    {
      key: "handling",
      title: "Handling",
      dataIndex: "handling",
    },
    {
      key: "cost",
      title: "Cost",
      dataIndex: "cost",
    },
    {
      key: "priority",
      title: "Priority",
      dataIndex: "priority",
      render: (value: string) => (
        <Pill className={value.toLowerCase()}>{value}</Pill>
      ),
    },
    {
      key: "lab",
      title: "Lab",
      dataIndex: "lab",
    },
    {
      key: "test",
      title: "Test",
      dataIndex: "test",
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

  useEffect(() => {
    const allowedRoles = ["admin", "doctor"];
    if (user && user.role && !allowedRoles.includes(user.role)) {
      navigate("/dashboard/overview");
    }
  }, [user, navigate]);

  const submitForm = async () => {
    try {
      const formValues = await form.validateFields();

      const payload: any = {
        ...formValues,
        signed: formValues.signed ?? false,
        collBy: formValues.collBy
          ? formValues.collBy.format("HH.mm MM/DD")
          : undefined,
        cost:
          typeof formValues.cost === "number"
            ? formValues.cost
            : Number(formValues.cost),
        number:
          typeof formValues.number === "number"
            ? formValues.number
            : Number(formValues.number),
      };

      if (!isEditMode) {
        const reports = await addReport(payload, message);
        setReports(reports);
      } else {
        const reports = await updateReport(reportId, payload, message);
        setReports(reports);
        setIsEditMode(false);
      }

      setOpenModal(false);
      form.resetFields();
    } catch (error) {
      // validation or ApiError: user already sees messages; keep modal open
    }
  };

  const handleModal = () => {
    form.resetFields();
    setOpenModal(false);
    setIsEditMode(false);
  };

  const handleEditRow = (v: any) => {
    v.collBy = dayjs(v.collBy);

    setOpenModal(true);
    setIsEditMode(true);
    setReportId(v._id);
    form.setFieldsValue(v);
  };

  const handleDeleteRow = (v: any) => {
    modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      content: "This operation will delete the report from database.",
      onOk() {
        deleteReport(v._id, message).then((reports) => setReports(reports));
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={reports}
        rowKey={"_id"}
        rowHoverable
      />
      <Row className="mt-2">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add Report
        </Button>
      </Row>

      <Modal
        forceRender
        open={openModal}
        onCancel={handleModal}
        onOk={submitForm}
        style={{ padding: "30px" }}
        destroyOnHidden
      >
        <ReportForm handleSubmit={submitForm} form={form} />
      </Modal>
    </>
  );
};

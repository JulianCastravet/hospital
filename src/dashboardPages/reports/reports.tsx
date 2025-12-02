import {
  App,
  Button,
  Checkbox,
  Flex,
  Modal,
  Row,
  Table,
  TablePaginationConfig,
} from "antd";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  EditFilled,
  DeleteFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { formatTime } from "../../utils/formatTime";
import ReportForm from "../../components/reportForm/reportForm";
import { Pill } from "../../components/pill/pill";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useReportStore } from "../../store/reports.store";
import { capitalize } from "../../utils/capitalize";
import { paginationConfig } from "../../configs";

export const Reports = () => {
  useTitle("Reports");
  const [form] = useForm();
  const { message, modal } = App.useApp();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    getAllReports,
    reports,
    addReport,
    deleteReport,
    updateReport,
    reportsLoading,
    reportsQuantity,
  } = useReportStore();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [reportId, setReportId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getAllReports(
      { page: currentPage, pageSize: paginationConfig.pageSize },
      message
    );
  }, [message, getAllReports, currentPage]);

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
        <Pill className={value.toLowerCase()}>{capitalize(value)}</Pill>
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
        collBy: formValues.collBy,
        cost: Number(formValues.cost),
        number: Number(formValues.number),
      };

      if (!isEditMode) {
        addReport(payload, message);
      } else {
        updateReport(reportId, payload, message);
        setIsEditMode(false);
      }

      setOpenModal(false);
      form.resetFields();
    } catch (error) {}
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
        deleteReport(v._id, message);
      },
      onCancel() {},
    });
  };

  const rpConfig: TablePaginationConfig = {
    ...paginationConfig,
    onChange: (page: number) => {
      setCurrentPage(page);
    },
    total: reportsQuantity,
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={reports}
        rowKey={"_id"}
        rowHoverable
        loading={reportsLoading}
        pagination={rpConfig}
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

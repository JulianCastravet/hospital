import { App, Button, Checkbox, Flex, Modal, Table } from "antd";
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

export const Reports = () => {
  useTitle("Reports");
  const [form] = useForm();
  const { message, modal } = App.useApp();

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

  const submitForm = () => {
    const formObj = form.getFieldsValue();
    if (!isEditMode) {
      form
        .validateFields()
        .then(() => {
          formObj.signed = formObj.signed ?? false;
          formObj.collBy = formObj.collBy?.format("HH.mm MM/DD");
          addReport(formObj, message).then((reports) => setReports(reports));
          setOpenModal(false);
          form.resetFields();
        })
        .catch((error) => {});
    } else {
      updateReport(reportId, formObj, message).then((reports) =>
        setReports(reports)
      );
      setOpenModal(false);
      form.resetFields();
      setIsEditMode(false);
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
      ></Table>

      <Button type="primary" onClick={() => setOpenModal(true)}>
        Add Report
      </Button>
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

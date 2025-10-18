import { Table } from "antd";
import { reports } from "../../data";
import { Pill } from "../pill/pill";
import { useTitle } from "../../hooks/useTitle";

export const Reports = () => {

  useTitle('Reports')
  const columns = [
    {
      key: "number",
      title: "Number",
      dataIndex: "number",
    },
    {
      key: "signed",
      title: "Signed",
      dataIndex: "signed",
      render: (value: boolean) => (
        <input type="checkbox" defaultChecked={value} />
      ),
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
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={reports}
        rowKey={(record) => record.number}
      ></Table>
    </>
  );
};

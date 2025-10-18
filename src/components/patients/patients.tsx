import { Table } from "antd";
import { useUser } from "../../hooks/useUser";

export const Patients = () => {
  const { users } = useUser();

  const dataSource = [
    ...users
      .filter((user) => user.type === "guest")
      .map((i, key) => ({
        key,
        id: i.id,
        name: i.name,
        mail: i.email,
        phone: i.phone,
      })),
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <a href={`/dashboard/patients/${record.id}`}>{name}</a>
      ),
    },
    {
      title: "Mail",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        sortDirections={["ascend", "descend"]}
      />
    </>
  );
};

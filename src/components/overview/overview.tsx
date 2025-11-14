import { App, Card, Flex, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { Report } from "../../data";
import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { User } from "../../context/authContext";
import { getAllUsers } from "../../api/user";
import { getAllReports } from "../../api/reports";

export const Overview = () => {
  useTitle("Overview");
  const { message } = App.useApp();

  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    getAllUsers(message).then((data) => setUsers(data));
    getAllReports(message).then((data) => setReports(data));
  }, [message]);

  const userData = [
    {
      name: "",
      Patients: users.filter((user) => user.type === "guest").length,
      Doctors: users.filter((user) => user.type === "doctor").length,
    },
  ];
  const reportData = [
    {
      name: "",
      Total: reports.length,
      LowPr: reports.filter((report) => report.priority === "Low").length,
      HighPr: reports.filter((report) => report.priority === "High").length,
    },
  ];
  return (
    <>
      <Flex gap={12}>
        <Card
          hoverable
          style={{ width: 620 }}
          styles={{ body: { padding: 20, overflow: "hidden" } }}
        >
          <Title>Total users</Title>
          <BarChart width={500} height={250} data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Patients" fill="#8884d8" />
            <Bar dataKey="Doctors" fill="#82ca9d" />
          </BarChart>
        </Card>

        <Card
          hoverable
          style={{ width: 620 }}
          styles={{ body: { padding: 20, overflow: "hidden" } }}
        >
          <Title>Total Reports</Title>
          <BarChart width={500} height={250} data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total" fill="#171586ff" />
            <Bar dataKey="LowPr." fill="#8884d8" />
            <Bar dataKey="HighPr." fill="#82ca9d" />
          </BarChart>
        </Card>
      </Flex>
    </>
  );
};

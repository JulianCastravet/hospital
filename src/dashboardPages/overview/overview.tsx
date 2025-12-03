import { App, Card, Flex, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { useTitle } from "../../hooks/useTitle";
import { useEffect } from "react";
import { useUserStore } from "../../store/user.store";
import { useReportStore } from "../../store/reports.store";

export const Overview = () => {
  useTitle("Overview");
  const { message } = App.useApp();

  const { users, getUsers } = useUserStore();
  const { reports, getAllReports } = useReportStore();

  useEffect(() => {
    getUsers(message);
    //get all the reports in order to get the length
    getAllReports({ page: 1, pageSize: 1000000000 }, message);
  }, [getUsers, getAllReports, message]);

  const userData = [
    {
      name: "",
      Patients: users.filter((user) => user.role === "patient").length,
      Doctors: users.filter((user) => user.role === "doctor").length,
    },
  ];

  const reportData = [
    {
      name: "",
      Total: reports.length,
      LowPr: reports.filter(
        (report) => report.priority === "Low" || report.priority === "low"
      ).length,
      HighPr: reports.filter(
        (report) => report.priority === "High" || report.priority === "high"
      ).length,
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

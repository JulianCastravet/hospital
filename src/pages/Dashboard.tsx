import { Layout, Menu, Breadcrumb, MenuProps, theme, Button } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  WindowsOutlined,
  CalendarOutlined,
  UserOutlined,
  ScheduleOutlined,
  RiseOutlined,
  MailOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Overview } from "../components/overview/overview";
import { Appointments } from "../components/appointments/appointments";
import { Patients } from "../components/patients/patients";
import { Schedule } from "../components/schedule/schedule";
import { Reports } from "../components/reports/reports";
import { Messages } from "../components/messages/messages";
import { Medications } from "../components/medications/medications";
import { Help } from "../components/help/help";
import { Settings } from "../components/settings/settings";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

export const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [subtitle, setSubtitle] = useState<string>("Overview");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  useTitle('Dashboard - Hospital')

  type MenuItem = Required<MenuProps>["items"][number];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const dictionary: Record<string, string> = {
    "1": "Overview",
    "2": "Appointments",
    "3": "Patients",
    "4": "Schedule",
    "5": "Reports",
    "6": "Messages",
    "7": "Medications",
    "8": "Help",
    "9": "Settings",
  };

  const handleMenuItemClick = (i: any) => {
    setSubtitle(dictionary[i.key]);
  };

  const userLogout = () => {
    setUser(undefined);
    navigate("/");
  };

  const items = [
    getItem("Overview", "1", <WindowsOutlined />),
    getItem("Appointments", "2", <CalendarOutlined />),
    getItem("Patients", "3", <UserOutlined />),
    getItem("Schedule", "4", <ScheduleOutlined />),
    getItem("Reports", "5", <RiseOutlined />),
    getItem("Messages", "6", <MailOutlined />),
    getItem("Medications", "7", <LinkOutlined />),
    getItem("Help", "8", <QuestionCircleOutlined />),
    getItem("Settings", "9", <SettingOutlined />),
  ];

  const getComponent = () => {
    switch (subtitle) {
      case "Overview":
        return <Overview />;
      case "Appointments":
        return <Appointments />;
      case "Patients":
        return <Patients />;
      case "Schedule":
        return <Schedule />;
      case "Reports":
        return <Reports />;
      case "Messages":
        return <Messages />;
      case "Medications":
        return <Medications />;
      case "Help":
        return <Help />;
      case "Settings":
        return <Settings />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" style={{ color: "white" }}>
          some logo here
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuItemClick}
        />
        <Button type="primary" onClick={userLogout}>
          Log Out
        </Button>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <span>Dashboard - {subtitle} </span>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Dashboard " }, { title: subtitle }]}
          />
          <Layout>
            <Content
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {getComponent()}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

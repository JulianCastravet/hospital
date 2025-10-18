import {
  Layout,
  Menu,
  Breadcrumb,
  MenuProps,
  theme,
  Button,
  Image,
  Flex,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
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
import { useAuth } from "../context/authContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [subtitle, setSubtitle] = useState<string>("Overview");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleMenuItemClick = (i: { key: string; value?: string }) => {
    setSubtitle(dictionary[i.key]);
    navigate(`/dashboard/${dictionary[i.key].toLowerCase()}`);
  };

  const userLogout = () => {
    setUser(undefined);
    navigate("/");
  };

  useEffect(() => {
    getDefaultLink();
  }, []);

  const getDefaultLink = (): string[] => {
    if (location.pathname.includes("patients")) {
      return ["3"];
    }
    return ["1"];
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" style={{ color: "white" }}>
          <Flex justify="center" align="center">
            <div style={{ width: "50%" }}>
              <Image src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png" />
            </div>
          </Flex>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={getDefaultLink()}
          mode="inline"
          items={items}
          onClick={handleMenuItemClick}
        />
        <Flex justify="center" style={{ marginTop: "20px" }}>
          <Button type="primary" onClick={userLogout}>
            Log Out
          </Button>
        </Flex>
      </Sider>
      <Layout>
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
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

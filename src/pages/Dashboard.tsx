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
import { useCallback, useEffect, useMemo, useState } from "react";
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
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useWebSocketStore } from "../websocket/websocket";
import { capitalize } from "../utils/capitalize";
import env from "../environment";

export const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [subtitle, setSubtitle] = useState<string>("Overview");
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const { disconnect, connect } = useWebSocketStore();
  

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

  const dictionary: Record<string, string> = useMemo(() => {
    return {
      "1": "overview",
      "2": "appointments",
      "3": "patients",
      "4": "schedule",
      "5": "reports",
      "6": "messages",
      "7": "medications",
      "8": "help",
      "9": "settings",
    };
  }, []);

  const role = user?.role;
  const isStaff = role === "admin" || role === "doctor" || role === "patient";

  const handleMenuItemClick = (i: { key: string; value?: string }) => {
    setSubtitle(capitalize(dictionary[i.key]));
    if (user && dictionary[i.key] === "settings") {
      navigate(`/dashboard/${user._id}/${dictionary[i.key]}`);
    } else {
      navigate(`/dashboard/${dictionary[i.key]}`);
    }
  };

  const userLogout = () => {
    logout();
    disconnect();
    navigate("/");
  };

  const getDefaultLink = useCallback((): string[] => {
    for (let i in dictionary) {
      if (location.pathname.includes(dictionary[i])) {
        return [i];
      }
    }
    return [""];
  }, [dictionary, location.pathname]);

  useEffect(() => {
    if (user) getDefaultLink();
    connect(env.WEB_SOCKET_URL);
  }, [user, getDefaultLink, connect]);

  const items = [
    getItem("Overview", "1", <WindowsOutlined />),
    isStaff ? getItem("Appointments", "2", <CalendarOutlined />) : null,
    isStaff && user?.userSettings.includes("Patients")
      ? getItem("Patients", "3", <UserOutlined />)
      : null,
    isStaff && user?.userSettings.includes("Has Schedule")
      ? getItem("Schedule", "4", <ScheduleOutlined />)
      : null,
    isStaff ? getItem("Reports", "5", <RiseOutlined />) : null,
    isStaff && user?.userSettings.includes("Has Messages")
      ? getItem("Messages", "6", <MailOutlined />)
      : null,
    isStaff && user?.userSettings.includes("Has Medications")
      ? getItem("Medications", "7", <LinkOutlined />)
      : null,
    isStaff && user?.userSettings.includes("Has Help")
      ? getItem("Help", "8", <QuestionCircleOutlined />)
      : null,
    getItem("Settings", "9", <SettingOutlined />),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme={user?.userSettings.includes("Dark Mode") ? "dark" : "light"}
        collapsedWidth={60}
      >
        <div className="demo-logo-vertical" style={{ color: "white" }}>
          <Flex justify="center" align="center">
            <div style={{ width: "50%" }}>
              <Image
                src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
                preview={false}
              />
            </div>
          </Flex>
        </div>
        <Menu
          theme={user?.userSettings.includes("Dark Mode") ? "dark" : "light"}
          defaultSelectedKeys={getDefaultLink()}
          mode="inline"
          items={items}
          onClick={handleMenuItemClick}
        />
        <Flex justify="center" style={{ marginTop: "20px" }}>
          <Button
            icon={<LogoutOutlined />}
            type="primary"
            onClick={userLogout}
            size="large"
            className="w-full m-1"
          >
            {!collapsed && "Log Out"}
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

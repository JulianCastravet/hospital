import React from "react";
import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuItemType } from "antd/es/menu/interface";
import { HomeOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

interface HeaderProps {}

const items: MenuItemType[] = [
  {
    key: 0,
    icon: <HomeOutlined />,
    label: <a href="/">Home</a>,
  },
  {
    key: 1,
    icon: <UserOutlined />,
    label: <a href="/sign-in">Sign In</a>,
  },
  {
    key: 2,
    icon: <UserAddOutlined />,
    label: <a href="/sign-up">Sign Up</a>,
  },
];

export const HeaderComponent = (props: HeaderProps) => {
  const makeActiveLink = (): string[] => {
    const link = window.document.URL;

    if (link.includes("/sign-in")) {
      return ["1"];
    }
    if (link.includes("/sign-up")) {
      return ["2"];
    } else return ["0"];
  };

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={makeActiveLink()}
        items={items}
      />
    </Header>
  );
};

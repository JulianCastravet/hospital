import { Footer } from "antd/es/layout/layout";
import React from "react";

interface FooterProps {}

export const FooterComponent = (props: FooterProps) => {
  return (
    <Footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      Copyright 2025
    </Footer>
  );
};

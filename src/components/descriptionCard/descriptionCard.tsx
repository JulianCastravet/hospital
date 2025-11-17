import { Col, Row, Typography } from "antd";
import React, { ReactNode } from "react";

interface DCProps {
  title: string;
  description: string | ReactNode;
  icon: ReactNode;
  titleDisabled?: boolean;
  descriptionDisabled?: boolean;
}

const DescriptionCard: React.FC<DCProps> = (props: DCProps) => {
  const { title, description, icon, titleDisabled, descriptionDisabled } =
    props;

  return (
    <Row gutter={10}>
      <Col>
        <div
          style={{
            padding: "5px",
            border: "2px solid #d3d3d3",
            borderRadius: "5px",
          }}
        >
          {icon}
        </div>
      </Col>
      <Col>
        {titleDisabled ? (
          <Typography.Title
            type="secondary"
            level={5}
            style={{ marginBottom: 0 }}
          >
            {title}
          </Typography.Title>
        ) : (
          <Typography.Title level={5} style={{ marginBottom: 0 }}>{title}</Typography.Title>
        )}
        {descriptionDisabled ? (
          <Typography.Text type="secondary">{description}</Typography.Text>
        ) : (
          <Typography.Text strong>{description}</Typography.Text>
        )}
      </Col>
    </Row>
  );
};

export default DescriptionCard;

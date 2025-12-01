import React, { useMemo } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Image, Typography, App } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { formatTime } from "../../utils/formatTime";
import DescriptionCard from "../../components/descriptionCard/descriptionCard";
import {
  CalendarOutlined,
  HourglassOutlined,
  WomanOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { ImageWithUpload } from "../../components/imageWithUpload/imageWithUpload";
import { useUserStore } from "../../store/user.store";
import { DASH } from "../../utils/dash";
import Title from "antd/es/typography/Title";
import { capitalize } from "../../utils/capitalize";
import { MedicalHistory } from "../../components/medicalHistory/medicalHistory";
import { AppointmentsHistory } from "../../components/appointmentsHistory/appointmentsHistory";
import { DocumentAgreements } from "../../components/documentsAgreement/documentsAgreement";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

const DAYS_TO_SHOW = ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"];

const PatientPage = () => {
  const params = useParams();
  useTitle("User Page");
  const { message } = App.useApp();

  const { user, getUser, deleteAvatar, loading } = useUserStore();

  useEffect(() => {
    if (!params.id) return;
    getUser(params.id, message);
  }, [params.id, message, getUser]);

  const removeUserImage = (id: string) => {
    if (user) {
      deleteAvatar(id, message);
    }
  };

  const getUserHealthParams = useMemo(() => {
    const data = user?.medicalInfo?.generalParams;

    if (!data) return [];

    return data.map((item, index) => ({
      name: item?.day ?? DAYS_TO_SHOW[index],
      min_bpm: item?.minBpm ?? 0,
      max_bpm: item?.maxBpm ?? 0,
      avg_bpm: item?.avgBpm ?? 0,
    }));
  }, [user?.medicalInfo?.generalParams]);

  return !user ? (
    <>User not found</>
  ) : (
    <>
      <Row gutter={[10, 20]}>
        <Col span={18} className="!flex flex-col gap-6">
          <Card title="Patient Information">
            <Row gutter={20}>
              <Col span={4}>
                <ImageWithUpload
                  avatarUrl={user.avatarUrl ?? ""}
                  userId={user._id}
                  removeImage={() => removeUserImage(user._id)}
                  loading={loading}
                />
                <Typography.Title level={4}>{user.name}</Typography.Title>
              </Col>
              <Col span={10}>
                <DescriptionCard
                  title="Gender"
                  titleDisabled
                  description={capitalize(user.gender)}
                  icon={
                    <WomanOutlined
                      style={{ fontSize: "20px", color: "turquoise" }}
                    />
                  }
                />

                <DescriptionCard
                  title="Age"
                  titleDisabled
                  description={user.age ?? DASH}
                  icon={
                    <HourglassOutlined
                      style={{ fontSize: "20px", color: "turquoise" }}
                    />
                  }
                />
                <DescriptionCard
                  title="Date of Birth"
                  titleDisabled
                  description={formatTime(user.dateOfBirth)}
                  icon={
                    <CalendarOutlined
                      style={{ fontSize: "20px", color: "turquoise" }}
                    />
                  }
                />
              </Col>
              <Col span={10} style={{ gap: "20px" }}>
                <DescriptionCard
                  title="Phone"
                  titleDisabled
                  description={user.phone}
                  icon={
                    <PhoneOutlined
                      style={{ fontSize: "20px", color: "turquoise" }}
                    />
                  }
                />

                <DescriptionCard
                  title="Email"
                  titleDisabled
                  description={
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  }
                  icon={
                    <MailOutlined
                      style={{ fontSize: "20px", color: "turquoise" }}
                    />
                  }
                />
                <DescriptionCard
                  title="Address"
                  titleDisabled
                  description={user.formattedAddress || DASH}
                  icon={
                    <EnvironmentOutlined
                      style={{ fontSize: "20px", color: "turquoise" }}
                    />
                  }
                />
                {user.specialization && (
                  <DescriptionCard
                    title="Specialization"
                    titleDisabled
                    description={"address to be fixed"}
                    icon={
                      <HeartOutlined
                        style={{ fontSize: "20px", color: "turquoise" }}
                      />
                    }
                  />
                )}
              </Col>
            </Row>
          </Card>
          <MedicalHistory
            medicalHistory={user.medicalInfo?.medicalHistory ?? []}
          />
          <Row className="!flex flex-row " gutter={10}>
            <AppointmentsHistory
              appointments={user.medicalInfo?.appointments ?? []}
            />
            <Col span={14}>
              <DocumentAgreements
                documents={user.medicalInfo?.documents ?? []}
              />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Card title="Medical Information">
            <Image
              preview={false}
              loading="lazy"
              src="https://cdn11.bigcommerce.com/s-pqoyj9mdma/images/stencil/1280x1280/products/1297/2180/KMH_1__87467.1683820602.jpg?c=2"
            />
            <Typography.Title level={3} className="text-center">
              Heart Rate
            </Typography.Title>
            <Typography.Paragraph className="text-center">
              Heart Rate is in stable and healty state this week. This should be
              based on some parameters. need to fix
            </Typography.Paragraph>
            <div className="flex flex-row">
              <div className="basis-2xs text-center">
                <Title level={4}>Average</Title>
                {user.medicalInfo?.generalParams[new Date().getDay()]?.avgBpm ??
                  DASH}{" "}
                bpm
              </div>
              <div className="basis-2xs text-center">
                <Title level={4}>Minimum</Title>
                {user.medicalInfo?.generalParams[new Date().getDay()]?.minBpm ??
                  DASH}{" "}
                bpm
              </div>
              <div className="basis-2xs text-center">
                <Title level={4}>Maximum</Title>
                {user.medicalInfo?.generalParams[new Date().getDay()]?.maxBpm ??
                  DASH}{" "}
                bpm
              </div>
            </div>
            <HeartRateChart data={getUserHealthParams} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

const HeartRateChart = React.memo(function HeartRateChart({
  data,
}: {
  data: any;
}) {
  return (
    <div>
      <LineChart
        style={{
          width: "100%",
          aspectRatio: 1.618,
          maxWidth: 800,
          margin: "auto",
        }}
        responsive
        data={data}
      >
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Line type="monotone" dataKey="min_bpm" stroke="#1a0e86ff" />
        <Line type="monotone" dataKey="max_bpm" stroke="#b30e3fff" />
        <Line type="monotone" dataKey="avg_bpm" stroke="#14c6ccff" />
        <Legend />
      </LineChart>
    </div>
  );
});

export default PatientPage;

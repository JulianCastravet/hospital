import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Image, Typography, App, Button } from "antd";
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

const PatientPage = () => {
  const params = useParams();
  useTitle("User Page");
  const { message } = App.useApp();

  const { user, getUser, getUsers, deleteAvatar, loading } = useUserStore();

  const [diagnoseModal, setDiagnoseModal] = useState<boolean>(false);

  useEffect(() => {
    if (!params.id) return;
    getUser(params.id, message);
    getUsers(message);
  }, [params.id, message, getUser, getUsers]);

  const removeUserImage = (id: string) => {
    if (user) {
      deleteAvatar(id, message);
    }
  };

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
                <Title level={4}>Average</Title> 78 bpm
              </div>
              <div className="basis-2xs text-center">
                <Title level={4}>Minimum</Title> 40 bpm
              </div>
              <div className="basis-2xs text-center">
                <Title level={4}>Maximum</Title> 90 bpm
              </div>
            </div>
            <div>grafic cu bpm x = weekdays, y= count of bpm</div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PatientPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  Typography,
  Timeline,
  App,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { useTitle } from "../../hooks/useTitle";
import { formatTime } from "../../utils/formatTime";
import DescriptionCard from "../descriptionCard/descriptionCard";
import {
  CalendarOutlined,
  HourglassOutlined,
  WomanOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import TimelineItem from "../timelineItem/timelineItem";
import { ImageWithUpload } from "../imageWithUpload/imageWithUpload";
import { useUserStore } from "../../store/user.store";
import { DASH } from "../../utils/dash";
import Title from "antd/es/typography/Title";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { capitalize } from "../../utils/capitalize";
import { getDoctorById } from "../../utils/getDoctorById";

const PatientPage = () => {
  const params = useParams();
  useTitle("User Page");
  const { message } = App.useApp();
  const [form] = useForm();

  const {
    user,
    users,
    updateUser,
    getUser,
    getUsers,
    addDiagnose,
    addAppointment,
  } = useUserStore();

  const [diagnoseModal, setDiagnoseModal] = useState<boolean>(false);
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);

  useEffect(() => {
    if (!params.id) return;
    getUser(params.id, message);
    getUsers(message);
  }, [params.id, message, getUser, getUsers]);

  const timelineItems = () => {
    if (!user?.medicalInfo?.appointments) return [];

    return user?.medicalInfo?.appointments.map((app) => ({
      dot: <CheckCircleFilled style={{ fontSize: "20px" }} />,
      color: "turquoise",
      children: (
        <TimelineItem
          date={app.time}
          doctor={getDoctorById(app.doctor, users ?? [])?.name || DASH}
          label={app.appointment}
        />
      ),
    }));
  };

  const removeUserImage = (id: string) => {
    if (user) {
      updateUser(id, { ...user, avatarUrl: "" }, message);
    }
  };

  const submitAddDiagnose = () => {
    form
      .validateFields(["time", "diagnose", "description"])
      .then(() => {
        if (!params.id) return;
        addDiagnose(params.id, form.getFieldsValue(), message);
        form.resetFields();
        setDiagnoseModal(false);
      })
      .catch((error) => console.log(error));
  };

  const submitAddAppointment = () => {
    form
      .validateFields(["time", "appointment", "doctor"])
      .then(() => {
        if (!params.id) return;
        addAppointment(params.id, form.getFieldsValue(), message);
        form.resetFields();
        setAppointmentModal(false);
      })
      .catch((error) => console.log(error));
  };

  const doctorOptions = users
    .filter((user) => user.type === "doctor")
    .map((doc) => ({
      value: doc._id,
      label: doc.name,
    }));

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
          <Card title="Medical History">
            <Row gutter={100}>
              {user.medicalInfo?.medicalHistory.map((diagnose) => {
                return (
                  <Col span={8} key={diagnose.id}>
                    <DescriptionCard
                      title={diagnose.diagnose}
                      descriptionDisabled
                      description={diagnose.description}
                      icon={
                        <WomanOutlined
                          style={{ fontSize: "20px", color: "turquoise" }}
                        />
                      }
                    />
                  </Col>
                );
              })}
            </Row>
          </Card>
          <Row className="!flex flex-row gap-13">
            <Col span={10}>
              <Card title="Appointment">
                <Timeline items={timelineItems()} />
              </Card>
            </Col>
            <Col span={13}>
              <Row>
                <Card title="Document Agreement">
                  a list of downloadable documents
                </Card>
                <Card title="Actions">
                  <Button type="primary" onClick={() => setDiagnoseModal(true)}>
                    Add Diagnose
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setAppointmentModal(true)}
                  >
                    Add Appointment
                  </Button>
                </Card>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Card title="Medical Information">
            <Image
              preview={false}
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

      <Modal
        open={diagnoseModal}
        onOk={submitAddDiagnose}
        destroyOnHidden
        onCancel={() => setDiagnoseModal(false)}
      >
        <Form form={form}>
          <Form.Item
            name="time"
            label="Date/Time"
            required
            rules={[{ required: true }]}
          >
            <DatePicker showTime format={"DD/MM/YYYY HH:mm"} />
          </Form.Item>
          <Form.Item
            name="diagnose"
            label="Diagnose"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            required
            rules={[{ required: true }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={appointmentModal}
        onOk={submitAddAppointment}
        destroyOnHidden
        onCancel={() => setAppointmentModal(false)}
      >
        <Form form={form}>
          <Form.Item
            name="time"
            label="Date/Time"
            required
            rules={[{ required: true }]}
          >
            <DatePicker showTime format={"DD/MM/YYYY HH:mm"} />
          </Form.Item>
          <Form.Item
            name="appointment"
            label="Title"
            required
            rules={[{ required: true }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            name="doctor"
            label="Doctor"
            required
            rules={[{ required: true }]}
          >
            <Select options={doctorOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PatientPage;

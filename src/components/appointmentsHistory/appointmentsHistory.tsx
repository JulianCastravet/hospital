import { Col, Card, Timeline, TimelineItemProps, Row, App, Button } from "antd";
import { Appointment } from "../../types";
import { DASH } from "../../utils/dash";
import { getDoctorById } from "../../utils/getDoctorById";
import TimelineItem from "../timelineItem/timelineItem";
import { CheckCircleFilled } from "@ant-design/icons";
import { useUserStore } from "../../store/user.store";
import { AppointmentModal } from "../appointmentModal/appointmentModal";
import { useForm } from "antd/es/form/Form";
import { usePatientStore } from "../../store/patient.store";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { capitalize } from "../../utils/capitalize";

interface AppointmentsHistoryProps {
  appointments: Appointment[];
}

export const AppointmentsHistory = (props: AppointmentsHistoryProps) => {
  const { appointments } = props;

  const { users } = useUserStore();
  const [form] = useForm();
  const params = useParams();
  const { message } = App.useApp();

  const { addAppointment } = usePatientStore();
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);

  const submitAddAppointment = () => {
    form
      .validateFields(["time", "appointment", "doctor"])
      .then(() => {
        if (!params.id) return;
        addAppointment({ id: params.id, body: form.getFieldsValue() }, message);
        form.resetFields();
        setAppointmentModal(false);
      })
      .catch((error) => console.log(error));
  };

  const doctorOptions = users
    .filter((user) => user.type === "doctor")
    .map((doc) => ({
      value: doc._id,
      label: (
        <span>
          {doc.name} | {capitalize(doc.specialization ?? "")}
        </span>
      ),
    }));

  const customTimeLineItems: TimelineItemProps[] = appointments.map(
    (app, index) => {
      return {
        dot: <CheckCircleFilled style={{ fontSize: "20px" }} />,
        color: "turquoise",
        children: (
          <TimelineItem
            date={app.time}
            doctor={getDoctorById(app.doctor, users ?? [])?.name || DASH}
            label={app.appointment}
            key={index}
          />
        ),
      };
    }
  );

  return (
    <>
      <Col span={10}>
        <Card title="Appointments">
          {appointments.length ? (
            <Timeline items={customTimeLineItems} />
          ) : (
            <>No appoiments for this user.</>
          )}

          <Row className="mt-5">
            <Button type="primary" onClick={() => setAppointmentModal(true)}>
              Add Appointment
            </Button>
          </Row>
        </Card>
      </Col>

      <AppointmentModal
        form={form}
        onCancel={() => setAppointmentModal(false)}
        onOk={submitAddAppointment}
        doctorOptions={doctorOptions}
        open={appointmentModal}
      />
    </>
  );
};

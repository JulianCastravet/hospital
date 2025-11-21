import { Card, Row, Col, App, Button } from "antd";
import DescriptionCard from "../descriptionCard/descriptionCard";
import { WomanOutlined } from "@ant-design/icons";
import { Disease } from "../../types";
import { DiagnoseModal } from "../diagnoseModal/diagnoseModal";
import { useForm } from "antd/es/form/Form";
import { usePatientStore } from "../../store/patient.store";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface MedicalHistoryProps {
  medicalHistory: Disease[];
}

export const MedicalHistory = (props: MedicalHistoryProps) => {
  const { medicalHistory } = props;

  const params = useParams();
  const [form] = useForm();
  const { message } = App.useApp();
  const { addDiagnose } = usePatientStore();
  const [diagnoseModal, setDiagnoseModal] = useState<boolean>(false);
  const submitAddDiagnose = () => {
    form
      .validateFields(["time", "diagnose", "description"])
      .then(() => {
        if (!params.id) return;
        addDiagnose({ id: params.id, body: form.getFieldsValue() }, message);
        form.resetFields();
        setDiagnoseModal(false);
      })
      .catch(() => {});
  };

  const handleModalClose = () => {
    setDiagnoseModal(false);
    form.resetFields();
  };

  return (
    <>
      <Card title="Medical History">
        <Row>
          {medicalHistory.length ? (
            medicalHistory.map((diagnose) => {
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
            })
          ) : (
            <>No medical history for this user.</>
          )}
        </Row>
        <Row className="mt-5">
          <Button type="primary" onClick={() => setDiagnoseModal(true)}>
            Add Diagnose
          </Button>
        </Row>
      </Card>
      [ diagnoseModal &&
      <DiagnoseModal
        form={form}
        onCancel={handleModalClose}
        onOk={submitAddDiagnose}
        open={diagnoseModal}
      />
      ]
    </>
  );
};

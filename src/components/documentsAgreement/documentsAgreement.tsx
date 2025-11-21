import { App, Button, Card, Row } from "antd";
import { Document } from "../../types/document";
import DescriptionCard from "../descriptionCard/descriptionCard";
import { FilePdfFilled, DeleteFilled, AlertFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { DocumentModal } from "../documentModal/documentModal";
import { useForm } from "antd/es/form/Form";
import { usePatientStore } from "../../store/patient.store";
import { useParams } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";
import Link from "antd/es/typography/Link";

interface DocumentAgreementsProps {
  documents: Document[];
}

export const DocumentAgreements = (props: DocumentAgreementsProps) => {
  const { documents } = props;
  const { id } = useParams();
  const [documentModalOpen, setDocumentModalOpen] = useState<boolean>(false);
  const [form] = useForm();
  const { message, modal } = App.useApp();

  const { uploadDocument, deleteDocument, loading } = usePatientStore();

  useEffect(() => {
    if (!loading) {
      setDocumentModalOpen(false);
    }
  }, [loading]);

  const addDocument = () => {
    form
      .validateFields()
      .then(() => {
        if (!id) return;
        const {
          title,
          document: { file },
          time,
        } = form.getFieldsValue();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("file", file);
        formData.append("date", time.toISOString());
        uploadDocument({ id, formData }, message);
        form.resetFields();
      })
      .catch(() => {});
  };
  const closeModal = () => {
    setDocumentModalOpen(false);
    form.resetFields();
  };

  const handleDeleteIcon = (_id: string) => {
    modal.confirm({
      title: "Danger!",
      content: "This action is irreversible. Are you sure?",
      icon: <AlertFilled />,
      onOk: () => {
        id && deleteDocument({ userId: id, docId: _id }, message);
        message.success({ content: "Document deleted successfully" });
      },
    });
  };

  return (
    <>
      <Card title="Document Agreements">
        {documents.length ? (
          documents.map((doc, index) => {
            return (
              <DescriptionCard
                title={
                  <Link target="_blank" href={doc.url}>
                    {doc.title}
                  </Link>
                }
                icon={
                  <FilePdfFilled
                    style={{ fontSize: "20px", color: "turquoise" }}
                  />
                }
                description={formatTime(doc.date)}
                descriptionDisabled
                key={index}
                hasSecondaryIcon
                secondaryIcon={
                  <DeleteFilled
                    onClick={() => handleDeleteIcon(doc.id)}
                    className="text-[20px] text-[red] transition duration-150 hover:text-red-200 hover:cursor-pointer"
                  />
                }
              />
            );
          })
        ) : (
          <>No documents available.</>
        )}

        <Row className="mt-5">
          <Button type="primary" onClick={() => setDocumentModalOpen(true)}>
            Add Document
          </Button>
        </Row>
      </Card>
      {documentModalOpen && (
        <DocumentModal
          confirmLoading={loading}
          open={documentModalOpen}
          onCancel={closeModal}
          onOk={addDocument}
          form={form}
        ></DocumentModal>
      )}
    </>
  );
};

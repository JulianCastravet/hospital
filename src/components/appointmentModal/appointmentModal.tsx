import { Modal, DatePicker, Input, Select, Form, FormInstance } from "antd";
import { DefaultOptionType } from "antd/es/select";

export interface AppointmentModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance;
  doctorOptions: DefaultOptionType[];
}

export const AppointmentModal = (props: AppointmentModalProps) => {
  const { open, onOk, onCancel, form, doctorOptions } = props;

  return (
    <Modal open={open} onOk={onOk} destroyOnHidden onCancel={onCancel}>
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
  );
};

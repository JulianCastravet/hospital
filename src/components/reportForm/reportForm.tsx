import { Checkbox, DatePicker, Form, Input } from "antd";
import { FormInstance } from "antd/es/form/Form";

export interface ReportFormProps {
  handleSubmit: () => void;
  form: FormInstance;
}

const ReportForm = ({ handleSubmit, form }: ReportFormProps) => {
  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="signed" label="Signed" valuePropName="checked">
        <Checkbox></Checkbox>
      </Form.Item>

      <Form.Item name="result" label="Result" rules={[{ required: true }]}>
        <Input placeholder="Result Comment" />
      </Form.Item>

      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Input placeholder="Result Added" />
      </Form.Item>

      <Form.Item
        name="collBy"
        label="Collected By"
        rules={[{ required: true }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item name="handling" label="Handling" rules={[{ required: true }]}>
        <Input placeholder="John Doe" />
      </Form.Item>

      <Form.Item name="cost" label="Cost" rules={[{ required: true }]}>
        <Input placeholder="N500" />
      </Form.Item>

      <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
        <Input placeholder="Low/High" />
      </Form.Item>

      <Form.Item name="lab" label="Laboratory" rules={[{ required: true }]}>
        <Input placeholder="Microbiology" />
      </Form.Item>

      <Form.Item name="test" label="Test">
        <Input placeholder="Blood Count" />
      </Form.Item>
    </Form>
  );
};

export default ReportForm;

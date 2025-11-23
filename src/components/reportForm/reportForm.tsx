import { Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
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

      <Form.Item
        name="result"
        label="Result"
        rules={[{ required: true, message: "Please enter the result" }]}
      >
        <Input placeholder="Result Comment" />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please enter the status" }]}
      >
        <Input placeholder="Result Added" />
      </Form.Item>

      <Form.Item
        name="collBy"
        label="Collected At"
        rules={[{ required: true, message: "Please select collection date" }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        name="handling"
        label="Handling"
        rules={[{ required: true, message: "Please enter handling info" }]}
      >
        <Input placeholder="John Doe" />
      </Form.Item>

      <Form.Item
        name="cost"
        label="Cost"
        rules={[{ required: true, message: "Please enter the cost" }]}
      >
        <InputNumber
          min={0}
          className="w-full"
          placeholder="500"
          addonBefore="N"
        />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: "Please enter the priority" }]}
      >
        <Input placeholder="Low/High" />
      </Form.Item>

      <Form.Item
        name="lab"
        label="Laboratory"
        rules={[{ required: true, message: "Please enter lab name" }]}
      >
        <Input placeholder="Microbiology" />
      </Form.Item>

      <Form.Item
        name="test"
        label="Test"
        rules={[{ required: true, message: "Please enter test name" }]}
      >
        <Input placeholder="Blood Count" />
      </Form.Item>

      <Form.Item
        name="number"
        label="Report Number"
        rules={[{ required: true, message: "Please enter report number" }]}
      >
        <InputNumber min={0} className="w-full" placeholder="1" />
      </Form.Item>
    </Form>
  );
};

export default ReportForm;

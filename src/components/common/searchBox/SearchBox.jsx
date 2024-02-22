import { Form, Input, Button } from "antd";
import { useEffect } from "react";

function SearchBox(props) {
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    props.setFromData({ ...e, page: 1 });
  };

  const handleReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form &&
      form.setFieldsValue({
        name: "joe",
        age: 30
      });
  }, [form]);

  return (
    <Form
      layout={"inline"}
      form={form}
      initialValues={{
        layout: "inline"
      }}
      onFinish={handleSubmit}
    >
      <Form.Item name="name" label="名称">
        <Input placeholder="请输入名称" />
      </Form.Item>
      <Form.Item name="age" label="年龄">
        <Input disabled={true} placeholder="请输入年龄" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType="button" onClick={handleReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}
export default SearchBox;

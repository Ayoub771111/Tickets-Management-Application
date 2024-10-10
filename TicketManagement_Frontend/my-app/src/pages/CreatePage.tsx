import React from "react";
import { Card, Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreatePage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { description: string; status: number }) => {
    try {
      await axios.post("https://localhost:7112/api/Tickets", {
        description: values.description,
        status: values.status,
      });

      message.success("Ticket added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding ticket:", error);
      message.error("Failed to add ticket. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "400px",
          padding: "20px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Add New Ticket</h1>
        <Form
          name="create-ticket"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ description: "", status: 0 }}
        >
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input placeholder="Enter ticket description" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status" }]}
          >
            <Select placeholder="Select ticket status">
              <Option value={0}>Open</Option>
              <Option value={1}>Closed</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Ticket
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePage;

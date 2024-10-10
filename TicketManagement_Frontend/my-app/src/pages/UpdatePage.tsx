import React, { useEffect, useState } from "react";
import { Card, Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const UpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<{
    description: string;
    status: number;
  } | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7112/api/Tickets/${id}`
        );
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        message.error("Failed to load ticket details.");
      }
    };

    fetchTicket();
  }, [id]);

  const onFinish = async (values: { description: string; status: number }) => {
    try {
      await axios.put(`https://localhost:7112/api/Tickets/${id}`, {
        description: values.description,
        status: values.status,
      });

      message.success("Ticket updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating ticket:", error);
      message.error("Failed to update ticket. Please try again.");
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

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
        <h1 style={{ textAlign: "center" }}>Update Ticket</h1>
        <Form
          name="update-ticket"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            description: ticket.description,
            status: ticket.status,
          }}
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
              Update Ticket
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdatePage;

import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Spin, message, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import "../Css/style.css";
import axios from "axios";

const { Link } = Typography;

interface Ticket {
  ticketID: number;
  description: string;
  status: number;
  date: string;
}

const TicketsPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://localhost:7112/api/Tickets");
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data: Ticket[] = await response.json();
        setDataSource(data);
      } catch (error) {
        setError(true);
        message.error("Failed to load tickets.");
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleUpdate = (id: number) => {
    navigate(`/update/${id}`);
  };

  const handleCreate = () => {
    navigate("/create");
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this ticket?",
      onOk: async () => {
        try {
          await axios.delete(`https://localhost:7112/api/Tickets/${id}`);
          message.success("Ticket deleted successfully!");
          setDataSource((prevData) =>
            prevData.filter((ticket) => ticket.ticketID !== id)
          );
        } catch (error) {
          message.error("Failed to delete the ticket.");
          console.error("Error deleting ticket:", error);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return date
      .toLocaleDateString("en-US", options)
      .replace(",", "")
      .replace(" ", "-");
  };

  const columns: ColumnsType<Ticket> = [
    { title: "Ticket ID", dataIndex: "ticketID", key: "ticketID" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (status === 0 ? "Open" : "Closed"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Link
            style={{
              color: "#7946cb",
              marginRight: "5px",
              textDecoration: "underline",
            }}
            onClick={() => handleUpdate(record.ticketID)}
          >
            Update
          </Link>
          <Link
            style={{ color: "#7946cb", textDecoration: "underline" }}
            onClick={() => handleDelete(record.ticketID)}
          >
            Delete
          </Link>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: "20px" }}>Failed to load tickets.</div>;
  }

  return (
    <div style={{ padding: "25px 80px" }}>
      <h1>Ticket Management</h1>
      <Table
        className="custom-table"
        dataSource={dataSource}
        columns={columns}
        rowKey="ticketID"
        pagination={false}
        style={{ background: "#f0f0f0" }}
      />
      <Button
        style={{ background: "#02a459", color: "white", marginTop: "20px" }}
        onClick={handleCreate}
      >
        Add New
      </Button>
    </div>
  );
};

export default TicketsPage;

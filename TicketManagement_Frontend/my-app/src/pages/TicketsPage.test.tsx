import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TicketsPage from "./TicketsPage";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("TicketsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    render(<TicketsPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays tickets on successful fetch", async () => {
    const ticketsData = [
      {
        ticketID: 1,
        description: "Test Ticket 1",
        status: 0,
        date: "2024-10-09",
      },
      {
        ticketID: 2,
        description: "Test Ticket 2",
        status: 1,
        date: "2024-10-08",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: ticketsData });

    render(<TicketsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Ticket 1/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Test Ticket 2/i)).toBeInTheDocument();
    });
  });

  test("handles error during fetch", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch tickets"));

    render(<TicketsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load tickets/i)).toBeInTheDocument();
    });
  });

  test("handles delete ticket", async () => {
    const ticketToDelete = {
      ticketID: 1,
      description: "Test Ticket 1",
      status: 0,
      date: "2024-10-09",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: [ticketToDelete] });
    mockedAxios.delete.mockResolvedValueOnce({});

    render(<TicketsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Ticket 1/i)).toBeInTheDocument();
    });

    // Simulate delete action
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Test Ticket 1/i)).not.toBeInTheDocument();
    });
  });
});

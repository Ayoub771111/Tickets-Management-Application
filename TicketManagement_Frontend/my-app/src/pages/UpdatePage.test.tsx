import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UpdatePage from "./UpdatePage";

// Set up axios mock adapter
const mock = new MockAdapter(axios);

describe("UpdatePage", () => {
  const ticketId = "1";
  const ticketData = {
    description: "Sample ticket",
    status: 0,
  };

  beforeEach(() => {
    // Mock the GET request to fetch the ticket
    mock
      .onGet(`https://localhost:7112/api/Tickets/${ticketId}`)
      .reply(200, ticketData);

    // Mock the PUT request for updating the ticket
    mock.onPut(`https://localhost:7112/api/Tickets/${ticketId}`).reply(200);
  });

  afterEach(() => {
    mock.reset();
  });

  test("renders the update page and loads ticket data", async () => {
    render(
      <MemoryRouter initialEntries={[`/update/${ticketId}`]}>
        <Routes>
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the loading text is displayed initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the ticket data to be loaded
    await waitFor(() => {
      expect(
        screen.getByDisplayValue(ticketData.description)
      ).toBeInTheDocument();
    });

    // Check if the description input and status select are rendered
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
  });

  test("submits the update form successfully", async () => {
    render(
      <MemoryRouter initialEntries={[`/update/${ticketId}`]}>
        <Routes>
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the ticket data to load
    await waitFor(() => {
      expect(
        screen.getByDisplayValue(ticketData.description)
      ).toBeInTheDocument();
    });

    // Change the description and status
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Updated ticket description" },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: "1" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /update ticket/i }));

    // Wait for the form submission and success message
    await waitFor(() => {
      expect(
        screen.getByText("Ticket updated successfully!")
      ).toBeInTheDocument();
    });
  });

  test("displays an error message when the ticket data fails to load", async () => {
    // Mock the GET request to return an error
    mock.onGet(`https://localhost:7112/api/Tickets/${ticketId}`).reply(500);

    render(
      <MemoryRouter initialEntries={[`/update/${ticketId}`]}>
        <Routes>
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the error message
    await waitFor(() => {
      expect(
        screen.getByText("Failed to load ticket details.")
      ).toBeInTheDocument();
    });
  });

  test("displays an error message when updating the ticket fails", async () => {
    // Mock the PUT request to return an error
    mock.onPut(`https://localhost:7112/api/Tickets/${ticketId}`).reply(500);

    render(
      <MemoryRouter initialEntries={[`/update/${ticketId}`]}>
        <Routes>
          <Route path="/update/:id" element={<UpdatePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the ticket data to load
    await waitFor(() => {
      expect(
        screen.getByDisplayValue(ticketData.description)
      ).toBeInTheDocument();
    });

    // Change the description and status
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Updated ticket description" },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: "1" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /update ticket/i }));

    // Wait for the error message
    await waitFor(() => {
      expect(
        screen.getByText("Failed to update ticket. Please try again.")
      ).toBeInTheDocument();
    });
  });
});

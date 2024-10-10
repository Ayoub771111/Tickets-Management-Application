import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePage from "./CreatePage";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("CreatePage", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("renders the form and submits successfully", async () => {
    mock.onPost("https://localhost:7112/api/Tickets").reply(200);

    render(
      <MemoryRouter>
        <CreatePage />
      </MemoryRouter>
    );

    // Check if the description input is present
    const descriptionInput = screen.getByPlaceholderText(
      "Enter ticket description"
    );
    userEvent.type(descriptionInput, "New test ticket");

    // Check if the status select is present
    const statusSelect = screen.getByPlaceholderText("Select ticket status");
    userEvent.selectOptions(statusSelect, "Open");

    // Click submit button
    const submitButton = screen.getByText("Add Ticket");
    userEvent.click(submitButton);

    // Assert success message
    await waitFor(() => {
      expect(
        screen.getByText("Ticket added successfully!")
      ).toBeInTheDocument();
    });
  });

  test("shows error message on failure", async () => {
    mock.onPost("https://localhost:7112/api/Tickets").reply(500);

    render(
      <MemoryRouter>
        <CreatePage />
      </MemoryRouter>
    );

    // Enter description and status
    const descriptionInput = screen.getByPlaceholderText(
      "Enter ticket description"
    );
    userEvent.type(descriptionInput, "New test ticket");

    const statusSelect = screen.getByPlaceholderText("Select ticket status");
    userEvent.selectOptions(statusSelect, "Open");

    // Submit form
    const submitButton = screen.getByText("Add Ticket");
    userEvent.click(submitButton);

    // Check error message
    await waitFor(() => {
      expect(
        screen.getByText("Failed to add ticket. Please try again.")
      ).toBeInTheDocument();
    });
  });
});

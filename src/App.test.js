import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";

import ChatInput from "./Component/ChatInput";

// Mock axios post method
jest.mock("axios");

describe("ChatInput", () => {
  it("sends a message when the send button is clicked", () => {
    const mockChannelId = "123";
    const mockUser = {
      username: "testuser",
      userImage: "testimage.jpg",
    };

    // Render the ChatInput component
    const { getByPlaceholderText, getByText } = render(
      <ChatInput
        channelName="testChannel"
        channelId={mockChannelId}
        user={mockUser}
      />
    );

    // Get the input field
    const input = getByPlaceholderText(/message #testchannel/i);

    // Simulate typing a message
    fireEvent.change(input, { target: { value: "Hello, world!" } });

    // Get the send button
    const sendButton = getByText(/send/i);

    // Mock the axios.post method
    axios.post.mockResolvedValueOnce({});

    // Simulate clicking the send button
    fireEvent.click(sendButton);

    // Assert that axios.post was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(
      `/messages/new?id=${mockChannelId}`,
      {
        message: "Hello, world!",
        timestamp: expect.any(String),
        username: mockUser.username,
        userImage: mockUser.userImage,
        conversationId: mockChannelId,
      }
    );

    // Assert that the input field is cleared after sending the message
    expect(input.value).toBe("");
  });
});

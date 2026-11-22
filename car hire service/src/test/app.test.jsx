import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Register from "../pages/register";

import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import { setDoc } from "firebase/firestore";

vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn()
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(),
  setDoc: vi.fn(),
  serverTimestamp: vi.fn()
}));

vi.mock("../services/firebase", () => ({
  auth: {},
  db: {},
  googleProvider: {}
}));

vi.mock("../components/Navbar", () => ({
  default: () => <nav>Navbar</nav>
}));

vi.mock("../components/footer", () => ({
  default: () => <footer>Footer</footer>
}));

describe("DriveEasy Registration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays the registration form", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
expect
    expect(
  screen.getByRole("heading", { name: "Create Account" })
).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your phone number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create a password")).toBeInTheDocument();
  });

  it("registers a user successfully", async () => {
    const user = userEvent.setup();

    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: "test123" }
    });

    setDoc.mockResolvedValue();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText("Enter your full name"), "Test User");
    await user.type(screen.getByPlaceholderText("Enter your email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter your phone number"), "0712345678");
    await user.type(screen.getByPlaceholderText("Create a password"), "password123");

    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(screen.getByText("Your account has been created successfully!")).toBeInTheDocument();
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(setDoc).toHaveBeenCalled();
  });

  it("displays an error when registration fails", async () => {
    const user = userEvent.setup();

    createUserWithEmailAndPassword.mockRejectedValue(
      new Error("Email already in use")
    );

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText("Enter your full name"), "Test User");
    await user.type(screen.getByPlaceholderText("Enter your email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter your phone number"), "0712345678");
    await user.type(screen.getByPlaceholderText("Create a password"), "password123");

    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(screen.getByText("Email already in use")).toBeInTheDocument();
    });
  });
});
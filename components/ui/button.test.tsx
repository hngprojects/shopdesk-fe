import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies default variant and size classes", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByText("Default Button");
    expect(button).toHaveClass(
      "bg-primary text-primary-foreground h-9 px-4 py-2"
    );
  });

  it("applies custom variant and size classes", () => {
    render(
      <Button variant="destructive" size="lg">
        Destructive Button
      </Button>
    );
    const button = screen.getByText("Destructive Button");
    expect(button).toHaveClass("bg-destructive text-white h-10 px-6");
  });

  it("disables the button when `disabled` is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
  });

  it("disables the button when `loading` is true", () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByText("Loading Button");
    expect(button).toBeDisabled();
  });

  it("renders left and right icons correctly", () => {
    render(
      <Button leftIcon={<span>Left</span>} rightIcon={<span>Right</span>}>
        Icon Button
      </Button>
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("applies fullWidth class when `fullWidth` is true", () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByText("Full Width Button");
    expect(button).toHaveClass("w-full");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByText("Clickable Button");
    await fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
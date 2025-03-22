import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

describe("Accordion", () => {
  it("should render the Accordion component", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        </Accordion>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
 });
 it("should apply custom class names to AccordionItem, AccordionTrigger, and AccordionContent", () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" className="custom-item-class">
          <AccordionTrigger className="custom-trigger-class">
            Item 1
          </AccordionTrigger>
          <AccordionContent className="custom-content-class">
            Content 1
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Item 1")).toHaveClass("custom-trigger-class");
  });
});
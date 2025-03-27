import StockPage from "@/app/(dashboard)/(app)/stock/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";



vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

vi.mock("@/services/stock", () => ({
  GetProduct: vi.fn(() =>
    Promise.resolve({ items: [{ id: "123", unique_id: "ABC123" }] })
  ),
  GetStock: vi.fn(() =>
    Promise.resolve({ items: [{ id: "stock1", name: "Sample Item", buying_price: 100, quantity: 10, currency_code: "USD" }] })
  ),
  deleteStock: vi.fn(() => Promise.resolve({})),
}));

vi.mock("@/store/useStore", () => ({
  useStore: () => ({
    organizationId: "random-string-huisoadigjspodaiaiohdgyui",
    organizationName: "Test Organization",
    organizationInitial: "TO",
  }),
}));

describe("Dashboard Page", () => {
  it("shows the loading animation initially", async () => {
    render(<StockPage />);
    expect(screen.queryByAltText("Loading...")).toBeInTheDocument();
  }, 10000);

  it("renders static content after loading", async () => {
    render(<StockPage />);
    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const text = await screen.findByText(/The simplest way to manage your shop!/i);
    expect(text).toBeInTheDocument();
  }, 10000);

  it("displays the organization name", async () => {
    render(<StockPage />);
    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const text = await screen.findByText(/Test Organization/i);
    expect(text).toBeInTheDocument();
  }, 10000);

  it("displays the product name", async () => {
    render(<StockPage />);
    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const text = await screen.findByText(/Sample Item/i);
    expect(text).toBeInTheDocument();
  }, 10000);

  it("displays the stock price", async () => {
    render(<StockPage />);
    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const text = await screen.findByText(/usd 100/i);
    expect(text).toBeInTheDocument();
  }, 10000);

  it("displays the stock quantity", async () => {
    render(<StockPage />);
    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const text = await screen.findAllByText(/10/i);
    expect(text[0]).toBeInTheDocument();
  }, 10000);

  it("does not display the product name when the list is empty", async () => {
    vi.resetModules();

    vi.doMock("@/services/stock", () => ({
      GetProduct: vi.fn(() => Promise.resolve({ items: [] })),
      GetStock: vi.fn(() => Promise.resolve({ items: [] })),
      deleteStock: vi.fn(() => Promise.resolve({})),
    }));

    const UpdatedPage = (await import('@/app/(dashboard)/(app)/stock/page'))
      .default;

    render(<UpdatedPage />);

    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    expect(screen.queryByText(/Sample Item/i)).not.toBeInTheDocument();
    expect(screen.getByText(/You have 0 items in stock/i)).toBeInTheDocument();
  }, 10000);
});

describe("Search Feature", () => {
  it("filters stock items based on search input - should find 'sample'", async () => {
    render(<StockPage />);

    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const searchInput = screen.getByPlaceholderText("Search by item name, SKU code");
    fireEvent.change(searchInput, { target: { value: "sample" } });
    
    expect(screen.queryByText(/Sample Item/i)).toBeInTheDocument();
  });

  it("filters stock items based on search input - should not find 'prod'", async () => {
    render(<StockPage />);

    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const searchInput = screen.getByPlaceholderText("Search by item name, SKU code");
    fireEvent.change(searchInput, { target: { value: "prod" } });
    
    expect(screen.queryByText(/Sample Item/i)).not.toBeInTheDocument();
  });

  it("filters stock items based on search input - should display empty search message", async () => {
    render(<StockPage />);

    await waitFor(() => expect(screen.queryByAltText("Loading...")).not.toBeInTheDocument(), { timeout: 10000 });

    const searchInput = screen.getByPlaceholderText("Search by item name, SKU code");
    fireEvent.change(searchInput, { target: { value: "prod" } });
    
    expect(screen.queryByText(/Search Item not found/i)).toBeInTheDocument();
  });
});

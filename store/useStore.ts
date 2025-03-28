import type { StockItem } from "@/types/stocks";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: string;
  name: string;
  categories?: { name: string }[];
  available_quantity?: number;
  turnover?: number;
  growth?: string;
};

type Metric = {
  title: string;
  value: string;
  change: string;
  icon: string;
  textColor: string;
};

type State = {
  organizationId: string;
  organizationName: string;
  organizationInitial: string;
  products: Product[];
  stockItems: StockItem[];
  isPremium: boolean;
  isProductLoading: boolean;
  revenueData: number[];
  isRevenueLoading: boolean;
  isRevenueError: boolean;
  metrics: Metric[];
  isMetricsLoading: boolean;
  isSearching: boolean;
  searchText: string;
  setOrganizationId: (organizationId: string) => void;
  setOrganizationName: (organizationName: string) => void;
  setOrganizationInitial: (organizationName: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSearchText: (searchText: string) => void;
  fetchProducts: () => Promise<void>;
  fetchRevenue: () => Promise<void>;
  fetchMetrics: () => Promise<void>;
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      organizationId: "",
      organizationName: "",
      organizationInitial: "",
      products: [],
      isProductLoading: false,
      revenueData: [],
      isRevenueLoading: false,
      isRevenueError: false,
      stockItems: [],
      searchText: "",
      isSearching: false,
      isPremium: false,
      setIsSearching: (isSearching) => set({ isSearching }),
      setSearchText: (searchText) => set({ searchText }),
      metrics: [],
      isMetricsLoading: false,
      setOrganizationId: (organizationId) => set({ organizationId }),
      setOrganizationName: (organizationName) => set({ organizationName }),
      setOrganizationInitial: (organizationName) =>
        set({ organizationInitial: getInitials(organizationName) }),
      fetchProducts: async () => {
        set({ isProductLoading: true });
        try {
          const res = await fetch("/api/product/get");
          const data = await res.json();
          set({ products: data });
        } catch (error) {
          console.error("Failed to fetch products", error);
        } finally {
          set({ isProductLoading: false });
        }
      },
      fetchRevenue: async () => {
        set({ isRevenueLoading: true, isRevenueError: false });
        try {
          const res = await fetch("/api/reports/sales/generate");
          const data = await res.json();
          set({ revenueData: data?.weeklyRevenue || [] });
        } catch (error) {
          console.error("Failed to fetch revenue", error);
          set({ isRevenueError: true });
        } finally {
          set({ isRevenueLoading: false });
        }
      },
      fetchMetrics: async () => {
        set({ isMetricsLoading: true });
        try {
          const res = await fetch("/api/report/metrics");
          const data = await res.json();
          const transformedMetrics = [
            {
              title: "Total Revenue",
              value: data.totalRevenue,
              change: data.revenueChange,
              icon: "/icons/revenue.svg",
              textColor: "text-grey-600",
            },
            {
              title: "Gross Profit Margin",
              value: data.grossProfit,
              change: data.grossChange,
              icon: "/icons/gross.svg",
              textColor: "text-grey-600",
            },
            {
              title: "Stock Turnover Rate",
              value: data.stockTurnover,
              change: data.stockChange,
              icon: "/icons/stockturn.svg",
              textColor: "text-gray-600",
            },
            {
              title: "Total Sale Transaction",
              value: data.totalSales,
              change: data.salesChange,
              icon: "/icons/TotalSale.svg",
              textColor: "text-grey-600",
            },
          ];
          set({ metrics: transformedMetrics });
        } catch (error) {
          console.error("Failed to fetch metrics:", error);
        } finally {
          set({ isMetricsLoading: false });
        }
      },
    }),
    {
      name: "organization-store",
    }
  )
);

/*
Usage for Stephen
import useStore from 'path'

const {organizationId, organizationName, setOrganizationId, setOrganizationName, fetchProducts, fetchRevenue, fetchMetrics} = useStore(); // just destructure the properties that you need.

 TO SET A VALUE

setOrganizationId('the_organization_id');
or
setOrganizationName('the_organization_name');

TO USE THE STATE

EXAMPLE:

<p>Organization ID: {organizationId}</p>
or 
<p>Organization Name: {organizationName}</p>

Or To send to an API route as request body

const body = {
  organizationId, // ensure you've set the organization id first
  productId, // if available or needed
  name: inputValueStateForName,
} // and so on

 TO SEND TO API ROUTE AS A PARAMETER

 const apiUrl = `api/stocks/create?organization_id=${organizationId}`

 THANK YOU!!!!!!!!!!1
*/

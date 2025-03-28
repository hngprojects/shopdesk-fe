type Stock<T> = {
  page: number;
  size: number;
  total: number;
  previous_page: number | null;
  next_page: number | null;
  items: T[];
};

export type StockItem = {
  name: string;
  quantity: number;
  buying_price: number;
  currency_code: string;
  supplier_id: string | null;
  buying_date: string;
  id: string;
  product_id: string;
  status: string;
  user_id: string;
  date_created: string;
  original_quantity: number;
  supplier: string | null;
  timeslots: any[];
  price: number;
  sku: string;
  sell_price: string;
  remaining: number;
  photos: string;
};

export type StockItemResponse = {
  name: string;
  description: string | null;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: string | null;
  unavailable: boolean;
  unavailable_start: string | null;
  unavailable_end: string | null;
  status: string; // Assuming possible statuses
  id: string;
  parent_product_id: string | null;
  parent: any | null; // Adjust type if parent has a defined structure
  organization_id: string;
  categories: string[];
  date_created: string; // ISO date format
  last_updated: string; // ISO date format
  user_id: string;
  current_price: { [currency: string]: [number, number | null] }[];
  is_deleted: boolean;
  available_quantity: number;
  selling_price: string | null;
  discounted_price: number | null;
  buying_price: number | null;
  photos: string[]; // Assuming photo URLs
  attributes: Record<string, any>; // Adjust based on attribute structure
};

export type StockResponse = Stock<StockItemResponse>;

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

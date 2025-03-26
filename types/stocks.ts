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

export type StockResponse = Stock<StockItem>;

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

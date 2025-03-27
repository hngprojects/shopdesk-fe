import type { StockItem } from './stocks';

type ContactInfo = {
  id: string;
  contact_data: string;
  contact_tag: string;
  phone_country_code: string;
  is_primary: boolean;
  contact_type: string;
};

type ExtraInfo = {
  key: string;
  value: string;
};

type Person = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_infos: ContactInfo[];
  extra_info: ExtraInfo[];
};

type Product = {
  id: string;
  name: string;
  organization_id: string;
  unique_id: string;
  description: string;
};

type Supplier = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  business_name: string;
  agreement_type: string;
  unique_id: string;
  url: string;
  tags: {
    id: string;
    name: string;
    model_type: string;
    parent_row_id: string;
  }[];
  contact_infos: ContactInfo[];
  locations: {
    id: string;
    parent_row_id: string;
    full_address: string;
    location_name: string;
    country: string;
    state: string;
    city: string;
  }[];
};

type Stock = {
  id: string;
  supplier: Supplier;
};

type SoldProduct = {
  id: string;
  sale_id: string;
  product_id: string;
  amount: number;
  quantity: number;
  start: string;
  end: string;
  start_dt: string;
  end_dt: string;
  day_of_week: string;
  buying_price: number;
  discount: number;
  currency_code: string;
  date_created: string;
  last_updated: string;
  product: Product;
  price_id: string;
  stock: StockItem;
  is_deleted: boolean;
};

type SaleDebt = {
  id: string;
  sale_id: string;
  debts_details: {
    id: string;
    unique_id: string;
    amount: number;
    expected_pay_date: string;
    invoiceable: boolean;
    created_at: string;
    date_issued: string;
    status: string;
    is_written_off: boolean;
    pending: boolean;
    third_party: string;
    is_outflow: boolean;
    biz_partner_id: string;
    currency_code: string;
    biz_partner: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      business_name: string;
      biz_partner_type: string;
    };
    debt_invoice: { invoice_id: string }[];
    payment_reference: string;
  };
};

type Sale = {
  id: string;
  agent_id: string;
  agent: Person;
  unique_id: string;
  products_sold: SoldProduct[];
  workflows: string[];
  products_returned: SoldProduct[];
  customer_id: string;
  organization_id: string;
  amount: number;
  currency_code: string;
  mode_of_payment: string;
  payment_status: string;
  sales_status: string;
  completion_status: string;
  debt_id: string;
  description: string;
  is_deleted: boolean;
  date_created: string;
  last_updated: string;
  date_created_db: string;
  last_updated_db: string;
  user_id: string;
  receipt_id: string;
  profit: string;
  return_amount: number;
  sale_debts: SaleDebt[];
  customer: Person;
  purchasedFor: Person;
  purchased_for: string;
  comment_count: number;
  rejection_reason: string;
  sent_email_ids: { template_id: string }[];
  extrainfo: string;
  handling_time_start: string;
  handling_time_end: string;
};

type WeeklySalesData = {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
};

export type {
  ContactInfo,
  ExtraInfo,
  Person,
  Product,
  Sale,
  SaleDebt,
  SoldProduct,
  Stock,
  Supplier,
  WeeklySalesData,
};

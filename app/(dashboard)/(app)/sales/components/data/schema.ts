import { z } from "zod";

export const stockSchema = z.object({
  id: z.string(),
  name: z.string(),
  sell_price: z.string(),
  available: z.string(),
});

const StockSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  buying_price: z.string(),
  currency_code: z.string(),
  supplier_id: z.string().nullable(),
  buying_date: z.string(),
  id: z.string(),
  product_id: z.string(),
  status: z.string(),
  user_id: z.string(),
  date_created: z.string(),
  original_quantity: z.number(),
  supplier: z.null(),
  timeslots: z.array(z.unknown()),
});

export default StockSchema;

export type Stock = z.infer<typeof StockSchema>;

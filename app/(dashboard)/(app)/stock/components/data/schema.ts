import { z } from "zod";

export const stockSchema = z.object({
  id: z.string(),
  name: z.string(),
  sell_price: z.string(),
  available: z.string(),
});

const StockSchema = z.object({
  name: z.string().optional(),
  quantity: z.string().optional(),
  buying_price: z.string().optional(),
  currency_code: z.string().optional(),
  supplier_id: z.string().nullable().optional(),
  buying_date: z.string().optional(),
  id: z.string(),
  product_id: z.string().optional(),
  status: z.string().optional(),
  user_id: z.string().optional(),
  date_created: z.string().optional(),
  original_quantity: z.number().optional(),
  supplier: z.null().optional(),
  timeslots: z.array(z.unknown()).optional(),
});

export default StockSchema;

export type Stock = z.infer<typeof StockSchema>;

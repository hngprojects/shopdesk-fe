import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { faker } from '@faker-js/faker';

// ✅ Fix __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stocks = Array.from({ length: 100 }, () => ({
  id: `STOCK-${faker.number.int({ min: 1000, max: 9999 })}`,
  name: faker.commerce.productName(),
  sell_price: `₦${faker.number.int({ min: 5000, max: 500000 }).toLocaleString()}`,
  available: faker.number.int({ min: 1, max: 100 }).toString(),
}));

fs.writeFileSync(
  path.join(__dirname, 'stocks.json'),
  JSON.stringify(stocks, null, 2)
);



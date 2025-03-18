import { getAccessToken } from "@/app/api/token";
import { useStore } from "@/store/useStore";


type Stock = {
  unique_id: any;
  id: string;
  name: string;
  quantity: number;
  buying_price: number;
  currency_code: string;
  product_id: string;
  organization_id: string;
  date_created: string;
  selectedSellingCurrency: { code: string; name: string };
};

type Product = {
  name: string;
  description: string;
  unique_id: string;
  url_slug: string;
  is_available: boolean;
  is_service: boolean;
  previous_url_slugs: {};
  unavailable: false;
  // "unavailable_start": "2025-03-14T13:14:42.799Z"
  // "unavailable_end": "2025-03-14T13:14:42.799Z",
  status: string;
  id: string;
  parent_product_id: string;
  parent: string;
  organization_id: string;
  categories: [];
  date_created: string;
  last_updated: string;
  user_id: string;
  current_price: string;
  is_deleted: boolean;
  available_quantity: number;
  selling_price: number;
  discounted_price: number;
  buying_price: number;
  photos: [];
  attributes: {};
}

type StockResponse = {
  page: number;
  size: number;
  total: number;
  previous_page: number | null;
  next_page: number | null;
  items: Stock[];
};

type ProductResponse = {
  page: number;
  size: number;
  total: number;
  debug: null;
  previous_page:number | null;
  next_page: number | null;
  items: Product[];
}
const token = await getAccessToken();
export async function CreateProduct(
  productName: string,
  unique_id:string,
  token: string | null
): Promise<Product> {

  const organization_id = useStore.getState().organizationId;  
  try {
  
    const formData = new FormData();
    formData.append("organization_id", organization_id);
    formData.append("name", productName);
     if (unique_id !== ""){
      formData.append("unique_id", unique_id);
     }


    const response = await fetch("/api/product/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add stock");
    }

    return data.id;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
}

export async function AddStock(
  productName: string,
  sellingPrice: number,
  quantity: number,
  product_id: string,
  currency_code: string,
  organizatiohn_id: string,
  date_created: string,
  selectedSellingCurrency: { code: string; name: string }
): Promise<Stock> {
  const organization_id = useStore.getState().organizationId;
  try {
    const token = await getAccessToken();
    const product_id = await CreateProduct(productName, "", token)
    
    

    const response = await fetch("/api/stocks/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: productName,
        buying_price: sellingPrice,
        quantity: quantity,
        currency_code: selectedSellingCurrency.code,
        organization_id: organization_id,
        product_id: product_id,
        date_created: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add stock");
    }

    return data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
}
export async function GetProduct(): Promise<StockResponse> {
  const organization_id = useStore.getState().organizationId;
  try {

    const response = await fetch(`/api/product/get?organization_id=${organization_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch stock");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching stock:", error);
    throw error;
  }
}

export async function GetStock(product_id:string): Promise<StockResponse> {
  const organization_id = useStore.getState().organizationId;
  try {
    const response = await fetch(`/api/stocks/get?organization_id=${organization_id}&product_id=${product_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch stock");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching stock:", error);
    throw error;
  }
}

export async function deleteStock(productId: string): Promise<void> {
  const organization_id = useStore.getState().organizationId;
  try {
    const token = await getAccessToken();
    const product_id = productId;
    const response = await fetch(`/api/product/delete?product_id=${product_id}&organization_id=${organization_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete stock");
    }
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw error;
  }
}


export async function editStock(
  stockId: string,
  stockData: {
    name: string;
    buying_price: number;
    quantity: number;
    currency_code: string;
  }
): Promise<void> {
  const organization_id = useStore.getState().organizationId;
  try {
    const token = await getAccessToken();

    const response = await fetch(`/api/stocks/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        organization_id: organization_id,
        stock_id: stockId,
        ...stockData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update stock");
    }
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
}
export async function editStockv3(
  stockId: string,
  stockData: {
    name: string;
    quantity: number;
  
  }
): Promise<void> {
  const organization_id = useStore.getState().organizationId;
  try {
    const token = await getAccessToken();

    const response = await fetch(`/api/stocks/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stock_id: stockId,
        organization_id: organization_id,
        ...stockData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update stock");
    }
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
}
export async function editPrice(
  stockId: string,
  stockData: {
    buying_price: number;
    currency_code: string;
  }
): Promise<void> {
  const organization_id = useStore.getState().organizationId;
  try {
    const token = await getAccessToken();

    const response = await fetch(`/api/stocks/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stock_id: stockId,
        organization_id: organization_id,
        ...stockData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update price");
    }
  } catch (error) {
    console.error("Error updating price:", error);
    throw error;
  }
}
export async function editQuantity(
  stockId: string,
  stockData: {
    quantity: number;
  
  }
): Promise<void> {
  const organization_id = useStore.getState().organizationId;
  try {
    const token = await getAccessToken();

    const response = await fetch(`/api/stocks/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stock_id: stockId,
        organization_id: organization_id,
        ...stockData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update stock");
    }
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
}

export async function editName(
  stockId: string,
  stockData: {
    name: string;
  
  }
): Promise<void> {
  const organization_id = useStore.getState().organizationId;
  try {
    const token = await getAccessToken();

    const response = await fetch(`/api/stocks/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stock_id: stockId,
        organization_id: organization_id,
        ...stockData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update stock");
    }
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
}
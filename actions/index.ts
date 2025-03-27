"use server";

export const getAllProductIds = async (
  organization_id: string,
  accessToken: string
) => {
  let page = 1;
  const size = 50;
  const allProductIds: string[] = [];
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await fetch(
      `https://api.timbu.cloud/products?organization_id=${organization_id}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    const ids = data.items.map((product: Product) => product.id);
    allProductIds.push(...ids);

    hasNextPage = !!data.next_page;
    page += 1;
  }

  return allProductIds;
};

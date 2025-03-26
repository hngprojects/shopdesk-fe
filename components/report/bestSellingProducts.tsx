import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Image from 'next/image';
import { useStore } from "@/store/useStore";

type Product = {
  id: string;
  name: string;
  categories?: { name: string }[];
  available_quantity?: number;
  turnover?: number;
  growth?: string;
};

const BestSellingProducts = () => {
  const { products, fetchProducts, isProductLoading } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered: Product[] = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.categories?.[0]?.name === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="mt-6">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mb-6">
            <div className="flex border size-[32px] items-center justify-center rounded-[8px]">
            <Image
             src="/icons/BestSelling.svg"
             alt="Sales Table Icon"
             width={18}
             height={18}
            />
            </div>
            <h2 className="text-lg font-bold">Best Selling Products</h2>
        </div>
        <p className="text-[16px] text-gray-400 hidden lg:flex ">View all</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 justify-between lg:items-center mb-4">
          <div className="flex gap-3">
            <button className="bg-white flex items-center justify-center border text-[14px] text-gray-600 px-4 py-2 rounded-[8px] gap-3">
              All time 
              <X/>
            </button>
            <button
              onClick={() => setShowCategoryOptions(!showCategoryOptions)}
              className="bg-white border text-[14px] text-gray-600 px-4 py-2 rounded-[8px] flex items-center gap-2"
            >
              <Image
                src="/icons/filter.svg"
                alt="Filter Icon"
                width={18}
                height={12}
              />
              Filter
            </button>
            {showCategoryOptions && (
              <div className="absolute z-10 mt-1 w-40 bg-white border rounded shadow text-sm">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedCategory("All");
                    setShowCategoryOptions(false);
                  }}
                >
                  All Categories
                </button>
                {[...new Set(
                  Array.isArray(products)
                    ? products
                        .map(p => p.categories?.[0]?.name)
                        .filter((name): name is string => typeof name === 'string')
                    : []
                )].map((cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryOptions(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex h-[48px] items-center justify-start gap-2 rounded-md border border-neutral-75 bg-white px-2 py-[0.875rem]">
            <Search className="size-4 flex-shrink-0 text-neutral-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[calc(100%-1rem)] flex-1 text-sm focus:border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-between bg-white shadow-lg py-2.5 px-2.5 items-center mt-4 lg:hidden">
          <button className="text-sm border text-grey-600 p-2.5 rounded-[10px]">Previous</button>
          <p className="text-sm text-gray-600">Page 1 of 10</p>
          <button className="text-sm border text-grey-600 p-2.5 rounded-[10px]">Next</button>
        </div>
        <table className="w-full text-left border">
          <thead className="pt-3">
            <tr className="bg-gray-100 text-[12px] pb-4 pt-2">
              <th className="table-cell-padding text-gray-600">Product</th>
              <th className="table-cell-padding text-gray-600">Product ID</th>
              <th className="table-cell-padding text-gray-600">Category</th>
              <th className="table-cell-padding text-gray-600 hidden lg:table-cell">Remaining Qty</th>
              <th className="table-cell-padding text-gray-600 hidden lg:table-cell">Turnover</th>
              <th className="table-cell-padding text-gray-600 hidden lg:table-cell">Increased by</th>
              <th className="table-cell-padding text-gray-600 hidden lg:table-cell">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-[14px]">
            {isProductLoading ? (
              <tr>
                <td className="py-2 px-4" colSpan={7}>Loading...</td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td className="py-2 px-4 text-center" colSpan={7}>No products found.</td>
              </tr>
            ) : (
              Array.isArray(filteredProducts) ? filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="table-object-padding">{product.name || "Unnamed Product"}</td>
                  <td className="table-object-padding">{product.id}</td>
                  <td className="table-object-padding">{product.categories?.[0]?.name || "N/A"}</td>
                  <td className="table-object-padding hidden lg:table-cell">{product.available_quantity || 0} Pieces</td>
                  <td className="table-object-padding hidden lg:table-cell">₦{product.turnover?.toLocaleString() || "N/A"}</td>
                  <td className="table-object-padding text-green-600 hidden lg:table-cell">{product.growth || "0%"}</td>
                  <td className="table-object-padding hidden lg:table-cell">
                    <button className="text-blue-500 underline">View</button>
                  </td>
                </tr>
              )) : null
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default BestSellingProducts;
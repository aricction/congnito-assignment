import { create } from "zustand";
import { Product } from "@/app/types/type-for-product";
import productsData from "@/data/product.json";
import bestSellingData from "@/data/bestsellproduct.json";
import dealsData from "@/data/dealproduct.json"; 

interface ProductState {
  products: Product[];
  bestSelling: Product[];
  dealsProduct: Product[];

  selectedProduct?: Product;
  selectedBestSelling?: Product;
  selectedDealsProduct?: Product;

  setProducts: (products: Product[]) => void;
  setSelectedProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  setBestSelling: (products: Product[]) => void;
  setSelectedBestSelling: (id: string) => void;
  getBestSellingById: (id: string) => Product | undefined;

  setDealsProducts: (products: Product[]) => void;
  setSelectedDealsProduct: (id: string) => void;
  getSelectedDealsProduct: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: productsData.map((p) => ({ ...p, quantity: 1 })),
  bestSelling: bestSellingData.map((p) => ({ ...p, quantity: 1 })),
  dealsProduct: dealsData.map((p) => ({ ...p, quantity: 1 })),

  selectedProduct: undefined,
  selectedBestSelling: undefined,
  selectedDealsProduct: undefined,

  setProducts: (products: Product[]) => set({ products }),
  setSelectedProduct: (id: string) => {
    const product = get().products.find((p) => p.id === id);
    set({ selectedProduct: product });
  },
  getProductById: (id: string) => get().products.find((p) => p.id === id),

  setBestSelling: (products: Product[]) => set({ bestSelling: products }),
  setSelectedBestSelling: (id: string) => {
    const product = get().bestSelling.find((p) => p.id === id);
    set({ selectedBestSelling: product });
  },
  getBestSellingById: (id: string) => get().bestSelling.find((p) => p.id === id),

  setDealsProducts: (products: Product[]) => set({ dealsProduct: products }),
  setSelectedDealsProduct: (id: string) => {
    const product = get().dealsProduct.find((p) => p.id === id);
    set({ selectedDealsProduct: product });
  },
  getSelectedDealsProduct: (id: string) =>
    get().dealsProduct.find((p) => p.id === id),
}));

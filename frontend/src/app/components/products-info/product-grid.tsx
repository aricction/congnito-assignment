import { Product } from "@/app/types/type-for-product";
import ProductCard from "./product-card";

interface Props {
  products: Product[];
    variant?: "default" | "deals" | "home"; 
}

export default function ProductGridPage({ products , variant}: Props) {
  return (
<div className="w-full flex flex-wrap gap-6 py-6">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id || `product-${index}`} 
          product={product} 
          variant={variant} 
        />
      ))}
    </div>
  );
}

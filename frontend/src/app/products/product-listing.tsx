import ProductGridPage from "../components/products-info/product-grid";
import { Product } from "../types/type-for-product";
import productsData from "@/data/product.json";

// Transform the JSON data to match the Product type
const products: Product[] = productsData.map((item: any) => ({
  ...item,
  price: parseFloat(item.price.replace("$", "")),
  oldprice: item.oldprice ? parseFloat(item.oldprice.replace("$", "")) : 0,
}));

export default function ProductListingPage(){
  return (
    <div>
        <ProductGridPage products={products}/>
    </div>
  )
}
"use client";

import Link from "next/link";
import { Product } from "@/app/types/type-for-product";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";
import { StarIcon } from "@heroicons/react/24/solid";

interface Props {
  product: Product;
    variant?: "default" | "deals" | "home"; 
}

export default function ProductCard({ product,  variant = "default" }: Props) {

  const cardWidth = variant === "deals"
      ? "w-[378.5px]": "w-[298px]";
   
  return (
    <Link href={`/products/${product.id}`}>
      <div className="w-[298px] border rounded-3xl shadow-md hover:shadow-lg transition relative group cursor-pointer p-4">
        <p
          className={`absolute top-0 left-0 text-white px-6 py-1 rounded-tl-full rounded-br-full ${product.spanColor}`}>
          {product.span}
        </p>

        <div className="w-full h-48 relative mb-4 mt-6 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <p className="text-[12px] text-[#ADADAD]">{product.type}</p>
        <h3 className=" text-[15px] font-normal mt-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center">
          <StarIcon className="w-5 h-5 text-[#F4A263]" />
          <h2 className="px-2 text-[#B6B6B6]">
            {Number(product.rating).toFixed(1)}
          </h2>
        </div>

      {product.by && (
          <div className="flex space-x-1">
          <p className="text-[#B6B6B6]">By</p>{" "}
          <span className="text-[#3BB77E]">{product.by}</span>
        </div>
        )}

        <div className="flex  items-center justify-between mt-2">
          <div className="flex items-center">
            <p className="font-medium text-[18px] text-[#3BB77E]">
              ${product.price}
            </p>
            {product.oldprice > 0 && (
              <p className="text-[#ADADAD] line-through font-bold text-sm px-2">
                ${product.oldprice}
              </p>
            )}
          </div>
          {variant === "home" && (
              <button className="bg-[#F53E32] text-white text-[14px] px-4 py-2 rounded-md flex items-center gap-2">
            <ShoppingCartIcon className="w-4 h-4" />
            Add
          </button>
        )}
        </div>

         {variant === "deals" && (

          <div>

              <button className="bg-[#F53E32] text-white text-[14px] px-4 py-2 rounded-md flex items-center gap-2">
            <ShoppingCartIcon className="w-4 h-4" />
            Add
          </button>
          </div>
        )}

         {variant === "default" && (
        <button  className="bg-[#F53E32] w-full mt-12 justify-center text-white text-[14px] px-4 py-2 rounded flex items-center gap-2">
                      <ShoppingCartIcon className="w-4 h-4" />
           Add to Cart
        </button>
      )}
      </div>
    </Link>
  );
}

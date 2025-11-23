"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "../../types/type-for-product";
import ProductsData from "@/data/product.json";
import { Card } from "@/components/ui/card";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Navbar from "@/app/components/navbar-component/page";
import SearchBar from "@/app/components/searchbar-component/page";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useProductStore } from "@/store/product-store";
import { useCartStore } from "@/store/cart-store";
import { StarIcon } from "@heroicons/react/24/solid";
import ProductFilterComponent from "@/app/components/product-filter-component/page";
import Footer from "@/app/components/footer-component/page";
import Products from "@/data/popularproduct.json";

export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const productId = params.id as string;
  const Stars = Array(5).fill(0);

  const { getProductById, getBestSellingById, getSelectedDealsProduct } =
    useProductStore();
  const product =
    getProductById(productId) ||
    getBestSellingById(productId) ||
    getSelectedDealsProduct(productId);

  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    const price = product.price;
    return price * quantity;
  };

  const calculateTotalOldPrice = () => {
    const oldPrice =  product.oldprice;
    return oldPrice * quantity;
  };

  const totalPrice = calculateTotalPrice();
  const totalOldPrice = calculateTotalOldPrice();

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <>
      <Navbar />
      <SearchBar />
      <Card className="bg-[#F53E32] w-full rounded">
        <div className="mx-[312px] flex justify-between">
          <p className="font-bold text-[19px] text-white">Product</p>

          <p className="font-normal text-[14px] text-white">Home - Product</p>
        </div>
      </Card>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-8xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <ProductFilterComponent />
          <Card className="w-[469px] h-[590px] relative overflow-hidden rounded-lg">
            <Image
              src={`/${product.image}`}
              alt={product.name}
              fill
              className="w-[400px] h-[400px] object-cover"
            />
          </Card>

          <div className="w-[500px] flex flex-col justify-start">
            <h1 className="text-[22px] font-normal mb-4">{product.name}</h1>
            <p className="font-normal text-[14px] text-[#7A7A7A] font-Poppins">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iure
              minus error doloribus saepe natus?
            </p>

            <div className="justify-start mt-[20px] items-center gap-4 mb-6 border-t border-gray-300">
              <div className="flex mt-6 items-center">
                {Stars.map((_, index) => (
                  <StarIcon
                    key={index}
                    className="w-7 h-7 px-1"
                    color={index < product.rating ? "#F5885F" : "#E4E5E9"}
                  />
                ))}
                <p className="text-[#7A7A7A] text-[15px] font-normal">
                  ( 75 Review )
                </p>
              </div>

              <div className="flex space-x-12">
                <div className="text-[16px] mt-[30px] font-bold flex flex-col">
                  <p className="">Brand</p>
                  <p className="mt-[10px]">Flavour</p>
                  <p className="mt-[10px]">Diet Type</p>
                  <p className="mt-[10px]">Weight</p>
                  <p className="mt-[10px]">Speciality</p>
                  <p className="mt-[10px]">Info</p>
                  <p className="mt-[10px]">Items</p>
                </div>

                <div className="text-[16px] text-[#777777] mt-[30px] flex flex-col">
                  <p className="">: LOREM IPSUM </p>
                  <p className="mt-[10px]">: Lorem ipsum </p>
                  <p className="mt-[10px]">: Lorem ipsum </p>
                  <p className="mt-[10px]">: Lorem ipsum </p>
                  <p className="mt-[10px]">: Lorem ipsum </p>
                  <p className="mt-[10px]">: Lorem ipsum </p>
                  <p className="mt-[10px]">: 1</p>
                </div>
              </div>

              <div className="flex items-center mt-[38px]">
                <p className="text-2xl font-semibold text-[#F53E32]">
                  ${totalPrice.toFixed(2)}
                </p>

                {product.oldprice > 0 && (
                  <p className="text-gray-500 line-through text-lg ml-2">
                    ${totalOldPrice.toFixed(2)}
                  </p>
                )}
                {quantity > 1 && (
                  <p className="text-sm text-[#7A7A7A] ml-2">
                    (${( product.price).toFixed(2)} × {quantity})
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="font-normal text-[16px]">Size/Weight :</p>
            </div>

            <div className="flex gap-4 items-center mt-6">
              <input
                type="text"
                value={quantity}
                readOnly
                className="px-2 py-1 border w-[40px] h-[40px] rounded-md"
              />

              <div className="flex flex-col">
                <button className=" rounded-md" onClick={handleIncrement}>
                  <PlusIcon className="w-5 h-5 text-black border" />
                </button>
                <button className=" rounded-md" onClick={handleDecrement}>
                  <MinusIcon className="w-5 h-5 text-black border" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#F53E32] text-white text-[16px] px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#d32f1f] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className=" justify-center flex mt-5 left-[120px] pb-12">
          <Card className="w-[996px] p-4 rounded-md">
            <div>
              <div className="flex space-x-12 border-b">

              <h1 className="font-semibold text-[16px] text-[#F53E32] cursor-pointer pb-[23px] border-b border-[#64B496]">
                Description
              </h1>
              <h1 className="font-semibold text-[16px] text-[##2B2B2D] cursor-pointer pb-[23px] border-b">
                Information
              </h1>
              <h1 className="font-semibold text-[16px] text-[##2B2B2D] cursor-pointer pb-[23px] border-b">
               Review
              </h1>
              </div>
              <p className="font-normal text-[14px] text-[#7A7A7A] mt-[32px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                in vero sapiente odio, error dolore vero temporibus consequatur,
                nobis veniam odit dignissimos consectetur quae in perferendis
                doloribusdebitis corporis, eaque dicta, repellat amet, illum
                adipisci vel perferendis dolor! Quis vel consequuntur repellat
                distinctio rem. Corrupti ratione alias odio, error dolore
                temporibus consequatur, nobis veniam odit laborum dignissimos
                consectetur quae vero in perferendis provident quis.
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-[16px] text-[#2B2B2D] py-[30px] pb-[23px] border-b">
                Packaging & Delivery
              </h1>
              <div>
                <p className="font-normal text-[14px] text-[#7A7A7A] mt-[32px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  in vero perferendis dolor! Quis vel consequuntur repellat
                  distinctio rem. Corrupti ratione alias odio, error dolore
                  temporibus consequatur, nobis veniam odit laborum dignissimos
                  consectetur quae vero in perferendis provident quis.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <h1 className="font-bold text-[32px]">Popular Products</h1>
          <div className="w-[600px]">
            <p className="text-[#7A7A7A]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et viverra maecenas accumsan
              lacus vel facilisis.
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-8 pb-12">
          {Products &&
            Products.length > 0 &&
            Products.map((item, idx) => {
              return (
                <Card key={item.id || `product-${idx}`} className="p-3 gap-1">
                  <div
                    className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={`/${item.image}`}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-[#777777]">{item.type}</p>
                    <p className="px-[32px] text-[15px] font-semibold mt-2">
                      {item.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-4">
                      <span className="text-[#F53E32] font-bold text-[16px]">
                        ${item.price}
                      </span>
                      <span className="text-[13px] line-through text-gray-400">
                        ${item.oldprice}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

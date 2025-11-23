import Image from "next/image";
import RegisterUserPage from "./auth/auth-register-form/page";
import Navbar from "./components/navbar-component/page";
import SearchBar from "./components/searchbar-component/page";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import ProductGridPage from "./components/products-info/product-grid";
import { Product } from "./types/type-for-product";
import productsData from "@/data/product.json";
import bestSellingProducts from "@/data/bestsellproduct.json";
import dealsProduct from "@/data/dealproduct.json";
import { Card } from "@/components/ui/card";
import { StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Footer from "./components/footer-component/page";

const products: Product[] = productsData.map((item: any) => ({
  ...item,
  price: parseFloat(String(item.price).replace("$", "")),
  oldprice: item.oldprice
    ? parseFloat(String(item.oldprice).replace("$", ""))
    : 0,
  quantity: item.quantity ?? 1,
}));

const bestSellingproducts: Product[] = bestSellingProducts.map((item: any) => ({
  ...item,
  price: parseFloat(String(item.price).replace("$", "")),
  oldprice: item.oldprice
    ? parseFloat(String(item.oldprice).replace("$", ""))
    : 0,
  quantity: item.quantity ?? 1,
}));

const dealproduct: Product[] = dealsProduct.map((item: any) => ({
  ...item,
  price: parseFloat(String(item.price).replace("$", "")),
  oldprice: item.oldprice
    ? parseFloat(String(item.oldprice).replace("$", ""))
    : 0,
  quantity: item.quantity ?? 1,
}));

export default function Home() {
  return (
    <div className="w-[1920px] items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="">
        <Navbar />
        <SearchBar />
      </div>
      <div className="h-[700px] w-auto bg-[#f0f1f0] relative">
        <div className="absolute top-[200px] left-24 right-0 w-full z-[50] flex justify-between items-start">
          <div className="w-[500px]">
            <div className="flex items-center">
              <p className="text-[#F53E32] text-[20px] font-bold underline">
                100%
              </p>
              <p className="px-2 text-[20px] font-bold">Organic Vegetables</p>
            </div>

            <p className="text-[55px] font-extrabold mt-2">
              The best way to stuff your wallet.
            </p>

            <p className="text-[#7A7A7A] text-[15px] font-normal mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              reiciendis beatae consequuntur.
            </p>

            <div className="mt-[40px] -z-999">
              <div className="relative w-[450px] z-30">
                <PaperAirplaneIcon className="w-5 h-5 text-gray-500 absolute left-5 top-1/2 -translate-y-1/2" />

                <input
                  type="text"
                  placeholder="Your email address"
                  className="w-full h-[64px] pl-14 pr-32 bg-white rounded-full 
              focus:outline-none focus:ring-2 focus:ring-[#64B496]"
                />

                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-[50px] px-6 
              bg-[#3BB77E] text-white rounded-full"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-30 mr-12">
            <img
              src="/asset/banner2.png"
              alt="banner"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="px-24 w-full mt-[75px] pb-10">
        <div className="flex justify-center gap-16">
          <div className="relative w-full max-w-[500px]">
            <img
              src="/asset/banner-1.png.png"
              className="w-full"
              alt="banner"
            />

            <div className="absolute  inset-0 flex flex-col justify-center items-start">
              <div className="mx-12 w-[203px]">
                <p className="text-black text-[24px] font-bold text-start ">
                  Everyday Fresh & Clean with Our Products
                </p>
                <button className="mt-12 px-6 py-2 bg-[#F53E32] text-white rounded-md">
                  Shop now
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-[500px]">
            <img src="/asset/banner-2.png" className="w-full" alt="banner" />

            <div className="absolute  inset-0 flex flex-col justify-center items-start">
              <div className="mx-12 w-[203px]">
                <p className="text-black text-[24px] font-bold text-start ">
                  Make your Breakfast Healthy and Easy
                </p>
                <button className="mt-12 px-6 py-2 bg-[#F53E32] text-white rounded-md">
                  Shop now
                </button>
              </div>
            </div>
          </div>
          <div className="relative w-full max-w-[500px]">
            <img src="/asset/banner-3.png" className="w-full" alt="banner" />

            <div className="absolute  inset-0 flex flex-col justify-center items-start">
              <div className="mx-12 w-[203px]">
                <p className="text-black text-[24px] font-bold text-start ">
                  The best Organic Products Online
                </p>
                <button className="mt-12 px-6 py-2 bg-[#F53E32] text-white rounded-md">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-32 w-full pb-10 ">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-[32px]">Popular Products</p>
          </div>
          <div className="flex space-x-8">

          <p className="font-semibold text-[16px] text-[#3BB77E]">All</p>
          <p className="font-semibold text-[16px]">Milks & Dairies</p>
          <p className="font-semibold text-[16px]">Coffes & Teas</p>
          <p className="font-semibold text-[16px]">Pet Foods</p>
          <p className="font-semibold text-[16px]">Meats</p>
          <p className="font-semibold text-[16px]">Vegetables</p>
          <p className="font-semibold text-[16px]">Fruits</p>
          </div>
        </div>

        <div className="mt-6">
          <ProductGridPage products={products} variant="home" />
        </div>
      </div>

      <div className="px-32 w-full pb-10 ">
        <p className="font-bold text-[32px] ">Best selling Products</p>

        <div className="mt-6">
          <div className="flex space-x-6">
            <img src="/asset/bestseller.png" className="w-[350px] shrink-0" />
            <ProductGridPage products={bestSellingproducts} variant="default" />
          </div>
        </div>
      </div>

      <div className="px-32 w-full pb-24">
        <p className="font-bold text-[32px]">Deals of the Day</p>
        <div className="flex justify-start space-x-4 mt-6">
          {dealsProduct &&
            dealproduct.map((item, idx) => {
              return (
                <div key={idx} className="relative justify-center flex">
                  <img
                    src={item.image}
                    className="w-[378px] object-cover h-full  "
                  />

                  <div className="absolute  z-[999] bottom-[-100] w-[300px] bg-white p-4 rounded-lg shadow-lg">
                    <p className=" text-[15px] font-normal mt-2">{item.name}</p>
                    <div className="flex items-center">
                      <StarIcon className="w-5 h-5 text-[#F4A263]" />
                      <h2 className="px-2 text-[#B6B6B6]">
                        {Number(item.rating).toFixed(1)}
                      </h2>
                    </div>
                    <div className="flex space-x-1">
                      <p className="text-[#B6B6B6]">By</p>{" "}
                      <span className="text-[#3BB77E]">{item.by}</span>
                    </div>
                    <div className="flex  items-center justify-between mt-2">
                      <div className="flex items-center">
                        <p className="font-medium text-[18px] text-[#3BB77E]">
                          ${item.price}
                        </p>
                        {item.oldprice > 0 && (
                          <p className="text-[#ADADAD] line-through font-bold text-sm px-2">
                            ${item.oldprice}
                          </p>
                        )}
                      </div>

                      <button className="bg-[#F53E32] text-white text-[14px] px-4 py-2 rounded-md flex items-center gap-2">
                        <ShoppingCartIcon className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="relative px-32 z-20 mt-16 rounded-md">
        <img
          src="/asset/bg.png"
          className="w-[1600px] absolute h-full object-cover z-10"
          alt="background"
        />

        <div className="px-32 z-40 flex justify-between items-center">
          <div className="w-1/2 py-8">
            <p className="mt-8 font-bold text-[40px]">
              Stay home & get your daily needs from our shop
            </p>
            <p className="text-[18px] text-[#7E7E7E]">
              Start Your Daily Shopping with Nest Mart
            </p>

            <div className="relative w-[450px] z-30 mt-8">
              <PaperAirplaneIcon className="w-5 h-5 text-gray-500 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Your email address"
                className="w-full h-[64px] pl-14 pr-32 bg-white rounded-full 
             focus:outline-none focus:ring-2 focus:ring-[#64B496]"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 h-[50px] px-6 
             bg-[#3BB77E] text-white rounded-full"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="relative z-30 mt-12">
            <img
              src="/asset/banner.png"
              alt="banner"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 px-32 flex pb-6 gap-2">
        <div className="bg-[#F4F6FA] p-4 w-[312px] flex space-x-6  items-center justify-start text-center">
          <img src="/asset/icon-1.png" className="w-10 h-10" />
          <div>
            <p className="font-semibold text-[18px]">Best prices & offers</p>
            <p>Orders $50 or more</p>
          </div>
        </div>

        <div className="bg-[#F4F6FA] p-4 w-[312px] flex space-x-6  items-center justify-start text-center">
          <img src="/asset/icon-2.png" className="w-10 h-10" />
          <div>
            <p className="font-semibold text-[18px]">Free delivery</p>
            <p className="text-[16px] text-[#ADADAD] font-sm">
              24/7 amazing services
            </p>
          </div>
        </div>

        <div className="bg-[#F4F6FA] p-4 w-[312px] flex space-x-6  items-center justify-start text-center">
          <img src="/asset/icon-3.png" className="w-10 h-10" />
          <div>
            <p className="font-semibold text-[18px]">Great daily deal</p>
            <p className="text-[16px] text-[#ADADAD] font-sm">
              When you sign up
            </p>
          </div>
        </div>

        <div className="bg-[#F4F6FA] p-4 w-[312px] flex space-x-6  items-center justify-start text-center">
          <img src="/asset/icon-4.png" className="w-10 h-10" />
          <div>
            <p className="font-semibold text-[18px]">Wide assortment</p>
            <p className="text-[16px] text-[#ADADAD] font-sm">Mega Discounts</p>
          </div>
        </div>

        <div className="bg-[#F4F6FA] p-4 w-[312px] flex space-x-6  items-center justify-start text-center">
          <img src="/asset/icon-5.png" className="w-10 h-10" />
          <div>
            <p className="font-semibold text-[18px]">Easy returns</p>
            <p className="text-[16px] text-[#ADADAD] font-sm">Within 30 days</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}

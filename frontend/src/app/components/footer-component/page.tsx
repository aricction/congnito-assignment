"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";


export default function Footer() {
  return (
    <div className="w-full bg-[#f0f1f0] py-16">
      {/* Wrapper */}
      <div className="max-w-8xl mx-auto flex justify-center gap-1">
        {/* Column 1 */}
        <div className="space-y-4 w-[440px]">
          <img src="/asset/navbar.png" className="w-40" />
          <p className="text-sm text-[#555]">
            FoodTrove is the biggest market of grocery products.
            <br />
            Get your daily needs from our store.
          </p>
          <p className="text-sm text-[#555] w-[350px] flex items-start space-x-4">
            <MapPinIcon className="w-7 h-7 text-[#F53E32]" />
            <span>
              51 Green St. Huntington, Ohio Beach, Ontario, NY 11746 KY 4783,
              USA.
            </span>
          </p>

          <p className="text-sm text-[#555] flex items-center space-x-4">
            <EnvelopeIcon className="w-5 h-5 text-[#F53E32]" />
            <span>example@email.com</span>
          </p>

          <p className="text-sm text-[#555] flex items-center space-x-4">
            <PhoneIcon className="w-5 h-5 text-[#F53E32]" />
            <span>+91 123 4567890</span>
          </p>
        </div>

        {/* Column 2 */}
        <div className="px-4">
          <p className="font-semibold mb-4 text-lg">Company</p>
          <div className="space-y-2 text-[#555] text-sm">
            <p>About Us</p>
            <p>Delivery Information</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Contact Us</p>
            <p>Support Center</p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="px-24">
          <p className="font-semibold mb-4 text-lg">Category</p>
          <div className="space-y-2 text-[#555] text-sm">
            <p>Dairy & Bakery</p>
            <p>Fruits & Vegetable</p>
            <p>Snack & Spice</p>
            <p>Juice & Drinks</p>
            <p>Chicken & Meat</p>
            <p>Fast Food</p>
          </div>
        </div>

        {/* Column 4 */}
        <div className="w-[416px]">
          <p className="font-semibold mb-4 text-lg">Subscribe Our Newsletter</p>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full h-[64px] pl-4 pr-12 bg-white rounded"
            />
            <PaperAirplaneIcon className="w-6 h-6 text-black absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
          </div>

          <div className="flex space-x-2 mt-4">
            <div className="mt-4 w-[35px] h-[35px] p-4 border rounded-md bg-white ">
            </div>
            <div className="mt-4 w-[35px] h-[35px] p-4 border rounded-md bg-white "></div>
            <div className="mt-4 w-[35px] h-[35px] p-4 border rounded-md bg-white "></div>
            <div className="mt-4 w-[35px] h-[35px] p-4 border rounded-md bg-white "></div>
          </div>
          <img src="/asset/type.png" className="mt-6" />
        </div>
      </div>

      <p className="text-center text-[#555] mt-16">
        © 2025 foodzy, All rights reserved.
      </p>
    </div>
  );
}

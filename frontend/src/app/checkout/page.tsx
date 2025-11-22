"use client";

import { useCartStore } from "@/store/cart-store";
import { Card } from "@/components/ui/card";
import Navbar from "../components/navbar-component/page";
import SearchBar from "../components/searchbar-component/page";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { verifyOtp, sendOtp } from "@/lib/api/auth-api";
import { useSearchParams, useRouter } from "next/navigation";
import { OrderData } from "../types/type-for-order";
import { placeOrder } from "@/lib/api/auth-api";
import { useAuthStore } from "@/store/auth-store";

export default function ProductCheckoutPage() {
  const stars = Array(5).fill(0);

  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [regionState, setRegionState] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(
    "Free Shipping - $0.00"
  );
  const [selectedPayment, setSelectedPayment] = useState("Cash on Delivery");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState(email);

  const [otp, setOtp] = useState("");
  const router = useRouter();
const { setLoggedIn, isLoggedIn: storeLoggedIn } = useAuthStore();




  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <SearchBar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Your cart is empty</p>
        </div>
      </>
    );
  }

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      alert("You must be logged in to place an order.");
      router.push("/auth/auth-login-form");
      return;
    }

    const orderData: OrderData = {
      email: emailInput,
      firstName,
      lastName,
      address,
      city,
      postCode,
      country,
      regionState,
      cartItems,
      totalAmount: getCartTotal(),
      deliveryMethod: selectedDelivery,
      paymentMethod: selectedPayment,
    };
    try {
      const res = await placeOrder(orderData);
      alert("Order placed successfully!");
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setPostCode("");
      setCountry("");
      setRegionState("");
      setSelectedDelivery("Free Shipping - $0.00");
      setSelectedPayment("Cash on Delivery");
      setOtp("");
      setEmailInput("");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await verifyOtp(emailInput, otp);
      setMessage(res.message);

      if(res.success){
        setLoggedIn(true);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <>
      <Navbar />
      <SearchBar />

      <Card className="bg-[#F53E32] w-full rounded">
        <div className="mx-[312px] flex justify-between">
          <p className="font-bold text-[19px] text-white">Checkout</p>

          <p className="font-normal text-[14px] text-white">Home - Checkout</p>
        </div>
      </Card>
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Card 1 */}
        <div className="w-[440px]">
          <div className="p-4 border rounded mb-4">
            <p className="font-bold text-[20px]">Summary</p>
            <p className="text-[#7A7A7A] text-[13px] mt-4">sub-Total</p>
            <p className="text-[#7A7A7A] text-[13px]">Delivery Charges</p>
            <div className="flex justify-between items-center border-t mt-3 pt-3">
              <p className="font-medium">Total Amount:</p>
              <p className="font-semibold">${getCartTotal()}</p>
            </div>

            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="flex items-start gap-4 mt-3 p-4 rounded"
              >
                <div className="flex">
                  <img
                    className="w-[80px] h-[80px] object-cover rounded-md"
                    src={`/${item.image}`}
                    alt={item.name}
                  />

                  <div className="px-2 flex flex-col justify-center">
                    {" "}
                    <div className="font-semibold text-[16px]">{item.name}</div>
                    <div className="flex mt-1">
                      {stars.map((_, index) => (
                        <StarIcon
                          key={index}
                          className="w-4 h-4"
                          color={index < item.rating ? "#F4A263" : "#E4E5E9"}
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[#3BB77E] font-bold text-[16px]">
                        ${item.price}
                      </span>
                      <span className="text-[13px] line-through text-gray-400">
                        ${item.oldprice}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="rounded p-4 ">
            <span className="font-semibold text-[20px]">Delivery Method</span>
            <span className="text-[#7A7A7A] font-normal text-[14px]">
              Please select the preferred shipping method to use on this order.
            </span>
            <div className="flex space-x-14">
              <div className="flex flex-col justify-start items-start">
                <label>Free Shipping</label>
                <div className="flex space-x-2">
                  <input
                    type="radio"
                    name="delivery"
                    checked={selectedDelivery === "Free Shipping - $0.00"}
                    onChange={() =>
                      setSelectedDelivery("Free Shipping - $0.00")
                    }
                  />
                  <span className="text-[#7A7A7A]">Rate - $0 .00</span>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <label>Free Shipping</label>
                <div className="flex space-x-2">
                  <input
                    type="radio"
                    name="delivery"
                    checked={selectedDelivery === "Free Shipping - $0.00"}
                    onChange={() =>
                      setSelectedDelivery("Free Shipping - $0.00")
                    }
                  />
                  <span className="text-[#7A7A7A]">Rate - $5.00</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded p-4 mt-4">
            <span className="font-semibold text-[20px]">Payment Method</span>

            <span className="text-[#7A7A7A] font-normal text-[14px]">
              Please select the preferred payment method to use on this order.
            </span>
            <div className="flex space-x-2">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "Cash on Delivery"}
                onChange={() => setSelectedPayment("Cash on Delivery")}
              />
              <label className="text-[#7A7A7A] text-[14px]">
                Cash on Delivery
              </label>
            </div>
            <div className="flex space-x-2">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "UPI"}
                onChange={() => setSelectedPayment("UPI")}
              />
              <label className="text-[#7A7A7A] font-normal text-[14px]">
                UPI
              </label>
            </div>
            <div className="flex space-x-2">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === "Bank Tranfer"}
                onChange={() => setSelectedPayment("Bank Transfer")}
              />
              <label className="text-[#7A7A7A] text-[14px]">
                Bank Transfer
              </label>
            </div>
          </Card>

          <Card className="rounded-[5px] p-4 mt-4">
            <span className="font-semibold text-[20px]">Payment Method</span>
          </Card>
        </div>

        {/* Card 2 */}
        <div>
          <Card className="w-[856px] h-[455px] p-6 rounded">
            <p className="font-semibold text-[20px] text-[#2B2B2D]">Customer</p>
            <p className="text-[#2B2B2D]">Checkout Options</p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full "
            >
              <p className="font-semibold text-[20px] text-[#2B2B2D] ">
                Returning Customer
              </p>
              {/* <p className="text-gray-600">
                OTP sent to <strong>{emailInput}</strong>
              </p> */}

              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2B2B2D] mb-[14px]">
                  Email Address
                </label>
                <input
                  type="text"
                  className="p-3 border rounded-md outline-none"
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">OTP</label>
                <input
                  type="text"
                  className="p-3 border rounded-md outline-none"
                  placeholder="Enter your OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button type="button" onClick={() => sendOtp(emailInput)}>
                Resend OTP
              </button>

              <div className="items-center flex justify-center pb-[10px]">
                <button
                  type="submit"
                  className="bg-[#F53E32] text-white py-2 w-[100px] rounded-md font-semibold "
                >
                  Verify
                </button>
              </div>
            </form>
          </Card>

          <Card className="rounded p-4 mt-4">
            <form>
              <label className="text-[20px] font-semibold">
                Billing Details
              </label>
              <p className="mt-6">Checkout Options</p>
              <div className="flex gap-4 mt-6">
                {/* First Input */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">First Name*</label>
                  <input
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Second Input */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Last Name*</label>
                  <input
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  className="p-3 border rounded-md outline-none"
                  placeholder=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex gap-4 mt-6">
                {/* First Input */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">City *</label>
                  <input
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder=""
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                {/* Second Input */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Post Code</label>
                  <input
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder="Post Code"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                {/* First Input */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Country *</label>
                  <input
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                {/* Second Input */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Region State</label>
                  <input
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder=""
                    value={regionState}
                    onChange={(e) => setRegionState(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </Card>
          <div className="justify-end flex mt-4">
            <button
              type="submit"
              onClick={handlePlaceOrder}
  disabled={!storeLoggedIn}
              className={`bg-[#F53E32] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 w-[150px] ${
                !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

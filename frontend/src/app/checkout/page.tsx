"use client";

import { useCartStore } from "@/store/cart-store";
import { Card } from "@/components/ui/card";
import Navbar from "../components/navbar-component/page";
import SearchBar from "../components/searchbar-component/page";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { verifyOtp, sendOtp, placeOrder } from "@/lib/api/auth-api";
import { useRouter } from "next/navigation";
import { OrderData } from "../types/type-for-order";
import { useAuthStore, authStore } from "@/store/auth-store";
import Footer from "../components/footer-component/page";

// Component to safely read email query param
function CheckoutEmail({
  onEmailChange,
}: {
  onEmailChange: (email: string) => void;
}) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") ?? "";
    onEmailChange(email);
  }, [onEmailChange]);
  return null;
}

export default function ProductCheckoutPage() {
  const stars = Array(5).fill(0);
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const storeLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

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
  
  // Computed value for button enabled state - use selector for reactivity
  const isOrderButtonEnabled = otpVerified && storeLoggedIn;



  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <SearchBar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Your cart is empty</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await verifyOtp(emailInput, otp);
      setMessage(res.message);
      console.log("OTP verification response:", res);
      
      if (res.status === "success") {
        console.log("OTP verified successfully, updating states...");
        setLoggedIn(true);
        setOtpVerified(true);
      } else {
        console.log("OTP verification failed - status is not 'success':", res);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Invalid OTP");
      console.error("OTP verification error:", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!storeLoggedIn || !otpVerified) {
      alert("You must be logged in and OTP verified to place an order.");
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
      await placeOrder(orderData);
      alert("Order placed successfully!");
      clearCart();
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
      setOtpVerified(false);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <>
      <CheckoutEmail onEmailChange={setEmailInput} />
      <Navbar />
      <SearchBar />

      {/* Header */}
      <Card className="bg-[#F53E32] w-full rounded">
        <div className="mx-[312px] flex justify-between">
          <p className="font-bold text-[19px] text-white">Checkout</p>
          <p className="font-normal text-[14px] text-white">Home - Checkout</p>
        </div>
      </Card>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Cards */}
        <div className="w-[440px]">
          {/* Summary Card */}
          <div className="p-4 border rounded mb-4">
            <p className="font-bold text-[20px]">Summary</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-[#7A7A7A] text-[13px]">Sub-Total</p>
              <p className="text-[#7A7A7A] text-[13px] font-medium">${getCartTotal().toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-[#7A7A7A] text-[13px]">Delivery Charges</p>
              <p className="text-[#7A7A7A] text-[13px] font-medium">
                {selectedDelivery.includes("Free") ? "$0.00" : "$5.00"}
              </p>
            </div>
            <div className="flex justify-between items-center border-t mt-3 pt-3">
              <p className="font-medium">Total Amount:</p>
              <p className="font-semibold text-[18px] text-[#F53E32]">
                ${(getCartTotal() + (selectedDelivery.includes("Free") ? 0 : 5)).toFixed(2)}
              </p>
            </div>

            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              const itemOldTotal = item.oldprice * item.quantity;
              
              return (
                <Card
                  key={item.id}
                  className="flex items-start gap-4 mt-3 p-4 rounded"
                >
                  <div className="flex w-full">
                    <img
                      className="w-[80px] h-[80px] object-cover rounded-md"
                      src={`/${item.image}`}
                      alt={item.name}
                    />
                    <div className="px-2 flex flex-col justify-between w-full">
                      <div>
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
                            ${item.price.toFixed(2)}
                          </span>
                          {item.oldprice > 0 && (
                            <span className="text-[13px] line-through text-gray-400">
                              ${item.oldprice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                 
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Delivery Method */}
          <Card className="rounded p-4">
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
                <label>Express Shipping</label>
                <div className="flex space-x-2">
                  <input
                    type="radio"
                    name="delivery"
                    checked={selectedDelivery === "Express Shipping - $5.00"}
                    onChange={() =>
                      setSelectedDelivery("Express Shipping - $5.00")
                    }
                  />
                  <span className="text-[#7A7A7A]">Rate - $5.00</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
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
                checked={selectedPayment === "Bank Transfer"}
                onChange={() => setSelectedPayment("Bank Transfer")}
              />
              <label className="text-[#7A7A7A] text-[14px]">
                Bank Transfer
              </label>
            </div>
          </Card>

          <Card className="rounded-[5px] p-4 mt-4 gap-1">
            <span className="font-semibold text-[20px]">Payment Method</span>
            <img src="/asset/payment.png" className="" />
          </Card>
        </div>

        {/* Right Cards */}
        <div>
          {/* Returning Customer / OTP */}
          <Card className="w-[856px] h-[455px] p-6 rounded">
            <p className="font-semibold text-[20px] text-[#2B2B2D]">Customer</p>
            <p className="text-[#2B2B2D]">Checkout Options</p>

            <form
              onSubmit={handleOtpSubmit}
              className="flex flex-col gap-4 w-full "
            >
              <p className="font-semibold text-[20px] text-[#2B2B2D]">
                Returning Customer
              </p>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-[#2B2B2D] mb-[14px]">
                  Email Address
                </label>
                <input
                  required
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
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => sendOtp(emailInput)}
                  className="text-[#F53E32] font-semibold"
                >
                  Resend OTP
                </button>
                <button
                  type="submit"
                  className="bg-[#F53E32] text-white py-2 px-4 rounded-md font-semibold"
                >
                  Verify
                </button>
              </div>

              {message && <p className="text-red-500">{message}</p>}
            </form>
          </Card>

          {/* Billing Details */}
          <Card className="rounded p-4 mt-4">
            <form>
              <label className="text-[20px] font-semibold">
                Billing Details
              </label>
              <p className="mt-6">Checkout Options</p>

              <div className="flex gap-4 mt-6">
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">First Name*</label>
                  <input
                    required
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Last Name*</label>
                  <input
                    required
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-6">
                <label className="font-medium">Address</label>
                <input
                  required
                  type="text"
                  className="p-3 border rounded-md outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">City *</label>
                  <input
                    required
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Post Code</label>
                  <input
                    required
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Country *</label>
                  <input
                    required
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="font-medium">Region State</label>
                  <input
                    required
                    type="text"
                    className="p-3 border rounded-md outline-none"
                    value={regionState}
                    onChange={(e) => setRegionState(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </Card>

          {/* Place Order Button */}
          <div className="justify-end flex mt-4">
            <button
              type="button"
              disabled={!isOrderButtonEnabled}
              onClick={handlePlaceOrder}
              className={`px-6 py-3 rounded-md font-semibold flex items-center justify-center gap-2 w-[150px] transition-all ${
                isOrderButtonEnabled
                  ? "text-white bg-[#F53E32] hover:bg-[#F63E32] cursor-pointer opacity-100"
                  : "text-gray-400 bg-gray-300 cursor-not-allowed opacity-50"
              }`}
              style={{ 
                pointerEvents: isOrderButtonEnabled ? 'auto' : 'none'
              }}
            >
              Place Order
            </button>
      
          </div>
        </div>
      </div>
      <div className="mt-[300px]">
        <Footer />
      </div>
    </>
  );
}

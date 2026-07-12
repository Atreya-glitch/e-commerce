"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          shipping: formData,
          total: cartTotal,
        }),
      });

      // If there's no API yet, we just simulate success for now
      // const result = await response.json();
      
      alert("Order placed successfully!");
      clearCart();
      setFormData({
        fullName: "",
        address: "",
        city: "",
        pinCode: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <form onSubmit={handlePlaceOrder}>
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">PIN Code</label>
                <input
                  type="text"
                  name="pinCode"
                  required
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm mb-2 text-gray-600">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg mb-6">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

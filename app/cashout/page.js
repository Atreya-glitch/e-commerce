"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  note: "",
};

export default function CashoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState(initialForm);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderPlaced(true);
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
          <h1 className="text-3xl font-black text-white">Your cart is empty</h1>
          <p className="mt-3 text-stone-400">
            Add a few products to your cart before you go to the cashout page.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Cashout</p>
          <h1 className="text-3xl md:text-4xl font-black text-white">Complete your order</h1>
          <p className="text-stone-400">Enter your delivery details and confirm the payment summary.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-stone-300">
                  <span>Full name</span>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-stone-300">
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-stone-300">
                  <span>Phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-stone-300">
                  <span>Country</span>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm text-stone-300">
                <span>Street address</span>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-2 text-sm text-stone-300">
                  <span>City</span>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-stone-300">
                  <span>State</span>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </label>

                <label className="space-y-2 text-sm text-stone-300">
                  <span>Postal code</span>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm text-stone-300">
                <span>Delivery notes (optional)</span>
                <textarea
                  name="note"
                  rows="4"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Leave at the front desk, call before delivery, etc."
                  className="w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/cart"
                  className="text-sm font-semibold text-stone-400 transition hover:text-white"
                >
                  Back to cart
                </Link>

                <button
                  type="submit"
                  className="rounded-full bg-amber-500 px-8 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-400"
                >
                  Place order
                </button>
              </div>
            </form>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-gradient-to-b from-stone-900 to-stone-950 p-6 md:p-8 backdrop-blur-sm h-fit lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-white">Order summary</h2>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-stone-400">Qty {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-stone-300">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-bold text-white">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {orderPlaced && (
              <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                <p className="font-semibold">Order placed successfully.</p>
                <p className="mt-1">Thanks, {formData.fullName || "there"}! Your delivery details have been recorded.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

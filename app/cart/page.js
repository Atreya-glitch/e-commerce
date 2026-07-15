"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 rounded-full bg-white/5 p-6 border border-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-400"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h1 className="text-3xl font-black mb-2 text-white">Your cart is empty</h1>
        <p className="text-stone-400 mb-8 max-w-md">
          Looks like you haven&apos;t added anything to your cart yet. Discover our collection of premium products.
        </p>
        <Link
          href="/products"
          className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-6 py-12 lg:px-8 w-full">
      <h1 className="text-3xl md:text-4xl font-black mb-8 text-white">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5 last:border-0 last:pb-0"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-900 border border-white/10">
                  <Image
                    src={item.image || `https://picsum.photos/seed/${encodeURIComponent(item.title)}/200/200`}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-stone-400 mt-1">{item.category}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-white/20 bg-stone-900 px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-stone-400 hover:text-white px-2 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-stone-400 hover:text-white px-2"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="w-20 text-right font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-500 hover:text-rose-400 transition"
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-stone-900 to-stone-950 p-8 backdrop-blur-sm sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-stone-300 border-b border-white/10 pb-6 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-medium text-white">Estimated Total</span>
              <span className="text-2xl font-black text-white">${cartTotal.toFixed(2)}</span>
            </div>

            <Link
              href="/cashout"
              className="block w-full rounded-full bg-amber-500 py-4 text-center text-sm font-bold text-stone-950 transition hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98]"
            >
              Checkout Now
            </Link>
            
            <p className="text-xs text-center text-stone-500 mt-4">
              Secure checkout provided by Stripe
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

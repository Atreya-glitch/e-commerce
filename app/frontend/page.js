"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

const categories = [
  "All",
  "Footwear",
  "Apparel",
  "Accessories",
  "Electronics",
  "Home",
  "Beauty",
  "Sports",
];
export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { addToCart, cartItems, removeFromCart, updateQuantity } = useCart();

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai-search', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }) 
      });
      const data = await response.json(); 
      setProducts(Array.isArray(data.products) ? data.products : (Array.isArray(data) ? data : []));
      setSubmittedQuery("");
      setSelectedCategory("All");
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetch("/api/product")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load products");
        return Array.isArray(data.products) ? data.products : [];
      })
      .then((items) => {
        if (isMounted) setProducts(items);
      })
      .catch(() => {
        if (isMounted) setProducts([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = submittedQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesQuery =
        !normalizedQuery ||
        product.title?.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [products, submittedQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-[1px] shadow-2xl shadow-orange-950/40">
          <div className="grid gap-8 rounded-[31px] bg-stone-950/95 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-10 lg:px-12">
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(query);
                    }
                  }}
                  placeholder="Search products..."
                  className="flex-1 rounded-lg border border-white/10 bg-stone-900/50 px-4 py-2 text-white placeholder:text-stone-400 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSearch(query)}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Search
                </button>
              </div>

              <span className="mb-4 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                New season drops
              </span>
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-5xl">
                Discover standout essentials for every day.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-stone-300 md:text-lg">
                Build your perfect cart with curated products, bold styling, and a modern storefront experience.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
                >
                  Shop collection
                </a>
                <a
                  href="/api/insert"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Seed products
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "40+ products", value: "Curated" },
                { label: "Free shipping", value: "On orders $75+" },
                { label: "Fast checkout", value: "Smooth UX" },
                { label: "Trusted quality", value: "Top picks" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm cursor-pointer transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-white/10">
                  <div className="text-2xl font-bold text-white cursor-pointer">{item.value}</div>
                  <div className="mt-1 text-sm text-stone-300 cursor-pointer">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-amber-400 bg-amber-400 text-stone-950"
                  : "border-white/10 bg-white/5 text-stone-200 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div id="products" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center text-stone-300">
              Loading products...
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center text-stone-300">
              No products found yet. Seed the store using the API route.
            </div>
          ) : (
            visibleProducts.map((product) => (
              <article
                key={`${product.title}-${product.category}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-white/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || `https://picsum.photos/seed/${encodeURIComponent(product.title)}/600/600`}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105 cursor-pointer"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200">
                      {product.category}
                    </span>
                    <span className="text-sm text-stone-300">4.8 ★</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{product.title}</h2>
                  <p className="text-sm text-stone-300">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-white">${product.price}</span>
                    {(() => {
                      const cartItem = cartItems.find(
                        (item) =>
                          item.id === (product.id || product._id || product.title) ||
                          item.title === product.title
                      );

                      return cartItem ? (
                        <div className="flex items-center rounded-full border border-white/20 bg-white/5 px-1 py-1 text-sm font-semibold text-white">
                          <button
                            onClick={() => {
                              if (cartItem.quantity > 1) {
                                updateQuantity(cartItem.id, cartItem.quantity - 1);
                              } else {
                                removeFromCart(cartItem.id);
                              }
                            }}
                            className="px-3 py-1 hover:text-amber-400 transition"
                          >
                            -
                          </button>
                          <span className="px-2 w-4 text-center">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="px-3 py-1 hover:text-amber-400 transition"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
                        >
                          Add to cart
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

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

export default function ProductsPage() {
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
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setProducts(
        Array.isArray(data.products)
          ? data.products
          : Array.isArray(data)
          ? data
          : []
      );
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
      {/* Header section */}
      <section className="bg-stone-900 border-b border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Our Collection
          </h1>
          <p className="mt-4 text-stone-400 max-w-2xl mx-auto">
            Explore our curated selection of premium products, designed to elevate your everyday lifestyle.
          </p>

          <div className="mt-8 flex max-w-xl mx-auto items-center gap-2 rounded-full border border-white/10 bg-stone-950 p-2 shadow-inner">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(query);
                }
              }}
              placeholder="Search for something specific..."
              className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-stone-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleSearch(query)}
              className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-amber-400 bg-amber-400 text-stone-950"
                  : "border-white/10 bg-white/5 text-stone-300 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <div className="col-span-full py-20 text-center text-stone-400">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4">Loading products...</p>
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-16 text-center text-stone-300">
              <p className="text-lg">No products found.</p>
              <p className="mt-2 text-sm text-stone-500">Seed the store or try a different search.</p>
            </div>
          ) : (
            visibleProducts.map((product) => (
              <article
                key={`${product.id || product._id || product.title}-${product.category}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-amber-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="relative aspect-square overflow-hidden bg-stone-900">
                  <Image
                    src={product.image || "https://picsum.photos/seed/product/600/600"}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-stone-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="line-clamp-1 text-lg font-bold text-white mb-1">
                    {product.title}
                  </h2>
                  <p className="line-clamp-2 text-sm text-stone-400 flex-1 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-white">
                      ${product.price}
                    </span>
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
                          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-400 hover:text-stone-950"
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

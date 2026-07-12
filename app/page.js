import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-stone-950 text-white flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center min-h-[600px] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[128px] mix-blend-screen" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="mb-6 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            Welcome to the Future of Retail
          </span>
          <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-stone-200 to-stone-500 mb-8 leading-tight">
            Curated Essentials <br /> for Modern Life.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-stone-400 mb-10 leading-relaxed font-medium">
            Discover a handpicked selection of premium products designed to elevate your everyday aesthetics and functionality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/products"
              className="rounded-full bg-amber-500 px-8 py-4 text-sm font-black text-stone-950 transition-all hover:bg-amber-400 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 text-center"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/40 text-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories (Preview) */}
      <section className="py-24 border-t border-white/10 bg-stone-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Trending Categories</h2>
              <p className="text-stone-400">Explore what&apos;s popular this week.</p>
            </div>
            <Link href="/products" className="hidden sm:flex text-amber-400 font-semibold hover:text-amber-300 items-center gap-2">
              View All 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
              { name: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" },
              { name: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop" },
              { name: "Apparel", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop" }
            ].map((cat) => (
              <Link key={cat.name} href={`/products`} className="group block relative h-80 rounded-[2rem] overflow-hidden">
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent transition-opacity group-hover:opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 sm:hidden flex justify-center">
             <Link href="/products" className="text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-2">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

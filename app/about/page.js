import Image from "next/image";

export const metadata = {
  title: "About Us | AESTHETICA",
  description: "Learn more about our mission, values, and the team behind AESTHETICA.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-white pb-20">

      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-950/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
        
        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-stone-400">
            Our Story.
          </h1>
          <p className="text-lg md:text-xl text-stone-300 font-medium leading-relaxed">
            Redefining e-commerce with a focus on curation, aesthetics, and uncompromising quality.
          </p>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 md:mt-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black mb-4 text-amber-500">Our Mission</h2>
              <p className="text-stone-300 leading-relaxed text-lg">
                At AESTHETICA, we believe that the objects you surround yourself with shape your daily experience. Our mission is to cut through the noise and provide a thoughtfully curated selection of products that elevate your lifestyle without compromising on quality or design.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-black mb-4 text-amber-500">The Curation Process</h2>
              <p className="text-stone-300 leading-relaxed text-lg">
                Every item on our platform undergoes a rigorous selection process. We look for innovative materials, ethical production methods, and timeless aesthetics. If we wouldn&apos;t use it ourselves, you won&apos;t find it here.
              </p>
            </div>
          </div>

          <div className="relative h-[600px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-amber-900/20">
            <Image 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1974&auto=format&fit=crop" 
              alt="Retail environment"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

  
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mt-32 border-t border-white/10 pt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-white">Core Values</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">The principles that guide everything we do.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Design First", desc: "Aesthetics aren't an afterthought; they are the foundation.", icon: "✨" },
            { title: "Quality Always", desc: "Products built to last, outliving fleeting trends.", icon: "🛡️" },
            { title: "Seamless Experience", desc: "From discovery to delivery, friction-free.", icon: "⚡" }
          ].map((val, i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition hover:-translate-y-2 hover:border-amber-400/50 hover:bg-white/10">
              <div className="text-4xl mb-4">{val.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{val.title}</h3>
              <p className="text-stone-400">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

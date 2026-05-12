const heroImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
];

export default function Hero() {
  const randomImage =
    heroImages[Math.floor(Math.random() * heroImages.length)];

  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${randomImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-black uppercase tracking-[0.2em] md:text-8xl">
          Night<span className="text-pink-500">Club</span>
        </h1>

        <p className="mt-6 text-sm uppercase tracking-[1em] text-white/80 md:text-lg">
          Have a good time
        </p>
      </div>
    </section>
  );
}
import Image from "next/image";

const hexagons = [
  { top: "10%", left: "5%", size: 40, delay: "0s", hideMobile: false },
  { top: "70%", left: "8%", size: 60, delay: "-2s", hideMobile: true },
  { top: "15%", left: "85%", size: 50, delay: "-4s", hideMobile: true },
  { top: "80%", left: "80%", size: 35, delay: "-1s", hideMobile: false },
  { top: "50%", left: "92%", size: 45, delay: "-3s", hideMobile: true },
  { top: "25%", left: "48%", size: 20, delay: "-5s", hideMobile: false },
  { top: "88%", left: "40%", size: 25, delay: "-2.5s", hideMobile: false },
  { top: "5%", left: "50%", size: 18, delay: "-1.5s", hideMobile: false },
];

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-mesh">
      {/* Floating hexagons background */}
      {hexagons.map((h, i) => (
        <div
          key={i}
          className={`hex ${h.hideMobile ? "hidden sm:block" : ""}`}
          style={{
            top: h.top,
            left: h.left,
            width: h.size,
            height: h.size,
            animationDelay: h.delay,
            borderColor: i % 2 === 0 ? "rgba(212,168,83,0.15)" : "rgba(0,212,255,0.12)",
          }}
        />
      ))}

      {/* Glow orbs */}
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: "clamp(200px, 40vw, 600px)",
          height: "clamp(200px, 40vw, 600px)",
          top: "-10%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(212,168,83,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: "clamp(250px, 50vw, 700px)",
          height: "clamp(250px, 50vw, 700px)",
          bottom: "-20%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <div className="animate-scale-in">
          <div className="logo-glow animate-float">
            <Image
              src="/logo.svg"
              alt="MMPharma"
              width={220}
              height={220}
              priority
              className="opacity-90"
              style={{
                width: "clamp(100px, 28vw, 220px)",
                height: "auto",
              }}
            />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="font-heading text-gradient-gold text-center leading-tight mt-6 sm:mt-8 md:mt-10 animate-fade-in-up delay-200"
          style={{
            fontSize: "clamp(1.5rem, 5.5vw, 5rem)",
            letterSpacing: "clamp(0.08em, 0.15vw, 0.15em)",
            textShadow: "0 0 40px rgba(212,168,83,0.1)",
          }}
        >
          <span className="block sm:inline">SOMETHING</span>{" "}
          <span className="block sm:inline">WONDERFUL</span>
        </h1>

        <p
          className="text-[#c8c8d8] font-body text-center mt-3 sm:mt-4 uppercase animate-fade-in-up delay-300"
          style={{
            fontSize: "clamp(0.6rem, 1.4vw, 1rem)",
            letterSpacing: "clamp(0.25em, 0.5vw, 0.5em)",
          }}
        >
          is about to be created
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 sm:gap-4 mt-8 sm:mt-10 md:mt-12 animate-fade-in-up delay-400">
          <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,168,83,0.5)] shrink-0" />
          <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Coming soon card */}
        <div className="glass-card rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 mt-8 sm:mt-10 animate-fade-in-up delay-500">
          <p
            className="font-heading text-transparent bg-clip-text whitespace-nowrap"
            style={{
              backgroundImage: "linear-gradient(135deg, #d4a853, #f59e0b)",
              fontSize: "clamp(0.75rem, 2vw, 1.3rem)",
              letterSpacing: "clamp(0.2em, 0.4vw, 0.4em)",
            }}
          >
            ✦ COMING SOON ✦
          </p>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center animate-fade-in-up delay-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan/60 animate-pulse" />
            <span className="text-[10px] sm:text-xs text-white/30 font-body tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              In development
            </span>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold/60 animate-pulse shrink-0" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    </main>
  );
}

import Image from "next/image";

const hexagons = [
  { top: "10%", left: "5%", size: 40, delay: "0s" },
  { top: "70%", left: "8%", size: 60, delay: "-2s" },
  { top: "15%", left: "85%", size: 50, delay: "-4s" },
  { top: "80%", left: "80%", size: 35, delay: "-1s" },
  { top: "50%", left: "92%", size: 45, delay: "-3s" },
  { top: "30%", left: "50%", size: 25, delay: "-5s" },
  { top: "85%", left: "45%", size: 30, delay: "-2.5s" },
  { top: "5%", left: "50%", size: 20, delay: "-1.5s" },
];

export default function Home() {
  return (
    <main className="relative h-dvh w-dvh overflow-hidden bg-mesh">
      {/* Floating hexagons background */}
      {hexagons.map((h, i) => (
        <div
          key={i}
          className="hex"
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
          width: "40vw",
          height: "40vw",
          top: "-10%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(212,168,83,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "-20%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
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
              style={{ width: "clamp(120px, 25vw, 220px)", height: "auto" }}
            />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="font-heading text-gradient-gold text-center leading-tight mt-10 animate-fade-in-up delay-200"
          style={{
            fontSize: "clamp(1.8rem, 6vw, 5rem)",
            letterSpacing: "0.15em",
            textShadow: "0 0 40px rgba(212,168,83,0.1)",
          }}
        >
          SOMETHING
          <br />
          WONDERFUL
        </h1>

        <p
          className="text-[#c8c8d8] font-body text-center mt-4 tracking-[0.3em] uppercase animate-fade-in-up delay-300"
          style={{
            fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
            letterSpacing: "0.5em",
          }}
        >
          is about to be created
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-12 animate-fade-in-up delay-400">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,168,83,0.5)]" />
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Coming soon card */}
        <div className="glass-card rounded-2xl px-10 py-4 mt-10 animate-fade-in-up delay-500">
          <p
            className="font-heading text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #d4a853, #f59e0b)",
              fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
              letterSpacing: "0.4em",
            }}
          >
            ✦ COMING SOON ✦
          </p>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in-up delay-700">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-pulse" />
            <span className="text-xs text-white/30 font-body tracking-[0.3em] uppercase">
              In development
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    </main>
  );
}

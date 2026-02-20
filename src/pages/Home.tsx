import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Camera, Users, BookOpen, ShoppingBag, Calendar, Sparkles,
  ArrowRight, Star, TrendingUp, Award, ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── Floating ambient orbs (reusable) ─── */
const Orb = ({ style }: { style: React.CSSProperties }) => (
  <div className="home-orb" style={style} />
);

/* ─── Animated counter ─── */
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── Reveal-on-scroll wrapper ─── */
const Reveal = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const features = [
    { icon: Camera,     title: "Portfolio Showcase",  description: "Create stunning galleries to showcase your photography work and captivate clients worldwide.", link: "/portfolio" },
    { icon: Calendar,   title: "Easy Booking",         description: "Manage bookings and payments seamlessly — your calendar, your rules.", link: "/booking" },
    { icon: Users,      title: "Collaborate",          description: "Connect with photographers, models, and creative minds across the globe.", link: "/community" },
    { icon: BookOpen,   title: "Learn & Grow",         description: "Access curated tutorials and resources to sharpen your skills at every level.", link: "/learn" },
    { icon: ShoppingBag,title: "Marketplace",          description: "Buy or rent photography gear from a trusted community of professionals.", link: "/marketplace" },
    { icon: Sparkles,   title: "Community",            description: "Join discussions, share experiences, and grow alongside fellow photographers.", link: "/community" },
  ];

  const stats = [
    { value: 48000, suffix: "+", label: "Photographers" },
    { value: 3200,  suffix: "+", label: "Bookings Made" },
    { value: 120000,suffix: "+", label: "Photos Shared" },
    { value: 98,    suffix: "%", label: "Satisfaction Rate" },
  ];

  const mockPhotos = [
    { gradient: "from-violet-900/60 to-indigo-900/60",  label: "Golden Hour" },
    { gradient: "from-rose-900/60 to-orange-900/60",     label: "Portraits" },
    { gradient: "from-cyan-900/60 to-blue-900/60",       label: "Architecture" },
    { gradient: "from-emerald-900/60 to-teal-900/60",    label: "Nature" },
    { gradient: "from-fuchsia-900/60 to-purple-900/60",  label: "Fashion" },
    { gradient: "from-amber-900/60 to-yellow-900/60",    label: "Street" },
  ];

  const testimonials = [
    { name: "Sarah Chen",   role: "Wedding Photographer",   stars: 5, text: "CLICKSY transformed my business. I went from 3 clients to fully booked within 2 months." },
    { name: "Marcus Webb",  role: "Commercial Photographer", stars: 5, text: "The marketplace is a game changer. Sold my old gear and upgraded my kit in a single weekend." },
    { name: "Priya Nair",   role: "Portrait Artist",        stars: 5, text: "The community forums are incredible — a wealth of knowledge from professionals who actually care." },
  ];

  return (
    <>
      <style>{`
        @keyframes orbFloat   { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.05)} }
        @keyframes orbFloat2  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(30px) scale(0.95)} }
        @keyframes orbFloat3  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-30px) scale(1.08)} }
        @keyframes shimmer    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes scrollBob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes gridPulse  { 0%,100%{opacity:0.03} 50%{opacity:0.07} }
        @keyframes particleDrift { 0%{transform:translateY(0) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-80vh) translateX(40px);opacity:0} }
        @keyframes borderGlow { 0%,100%{border-color:hsl(var(--primary)/0.3)} 50%{border-color:hsl(var(--accent)/0.5)} }
        @keyframes heroText   { 0%{opacity:0;letter-spacing:0.3em} 100%{opacity:1;letter-spacing:normal} }

        .home-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .home-grid-overlay {
          background-image: linear-gradient(hsl(var(--foreground)/0.04) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)/0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 4s ease-in-out infinite;
        }

        .shimmer-text {
          background: linear-gradient(90deg,
            hsl(var(--primary)) 0%,
            hsl(var(--accent)) 30%,
            hsl(var(--primary-glow)) 60%,
            hsl(var(--accent)) 80%,
            hsl(var(--primary)) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .hero-text-animate {
          animation: heroText 1.2s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        .glass-feature-card {
          background: linear-gradient(135deg, hsl(var(--card)/0.6), hsl(var(--card)/0.3));
          backdrop-filter: blur(20px);
          border: 1px solid hsl(var(--border));
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          animation: borderGlow 3s ease-in-out infinite;
        }

        .glass-feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 80px -20px hsl(var(--primary)/0.35);
          border-color: hsl(var(--primary)/0.6);
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: hsl(var(--primary));
          border-radius: 50%;
          animation: particleDrift linear infinite;
          pointer-events: none;
        }

        .photo-card {
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
          cursor: pointer;
        }

        .photo-card:hover {
          transform: scale(1.04);
          z-index: 10;
          box-shadow: 0 25px 70px -10px hsl(var(--primary)/0.4);
        }

        .photo-card:hover .photo-label {
          opacity: 1;
          transform: translateY(0);
        }

        .photo-label {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .stat-card {
          background: linear-gradient(135deg, hsl(var(--card)/0.8), hsl(var(--card)/0.4));
          backdrop-filter: blur(16px);
          border: 1px solid hsl(var(--border));
        }

        .scroll-indicator {
          animation: scrollBob 2s ease-in-out infinite;
        }

        .cta-glow {
          box-shadow: 0 0 60px -10px hsl(var(--primary)/0.5), 0 0 120px -30px hsl(var(--accent)/0.3);
        }
      `}</style>

      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 home-grid-overlay" />

          {/* Ambient orbs */}
          <Orb style={{ width:600, height:600, top:"-10%", left:"-10%", background:"hsl(var(--primary)/0.18)", animation:"orbFloat 9s ease-in-out infinite" }} />
          <Orb style={{ width:500, height:500, bottom:"-5%", right:"-8%",  background:"hsl(var(--accent)/0.14)",  animation:"orbFloat2 11s ease-in-out infinite" }} />
          <Orb style={{ width:350, height:350, top:"30%",   left:"60%",    background:"hsl(var(--primary-glow)/0.1)", animation:"orbFloat3 7s ease-in-out infinite" }} />

          {/* Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-${Math.random() * 20}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
                opacity: Math.random() * 0.7 + 0.3,
                background: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))",
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
            />
          ))}

          <div className="relative z-10 container mx-auto px-4 text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card)/0.7), hsl(var(--card)/0.4))",
                backdropFilter: "blur(12px)",
                borderColor: "hsl(var(--primary)/0.4)",
                animation: "heroText 0.8s ease forwards",
                opacity: 0,
              }}
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                The #1 Platform for Photographers
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tight"
              style={{ animation: "heroText 1s 0.2s ease forwards", opacity: 0 }}
            >
              One{" "}
              <span className="shimmer-text">Click,</span>
              <br />
              <span className="text-foreground/90">Infinite</span>
              <br />
              <span className="shimmer-text">Possibilities</span>
            </h1>

            <p
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ animation: "heroText 1s 0.5s ease forwards", opacity: 0 }}
            >
              The ultimate platform for photographers to showcase, connect, and grow their business — all in one beautifully crafted space.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{ animation: "heroText 1s 0.7s ease forwards", opacity: 0 }}
            >
              <Link to="/auth">
                <Button size="lg" className="btn-primary-gradient text-base px-10 h-14 rounded-full gap-2 group">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-10 h-14 rounded-full"
                  style={{
                    background: "hsl(var(--card)/0.4)",
                    backdropFilter: "blur(10px)",
                    borderColor: "hsl(var(--border))",
                  }}
                >
                  Explore Portfolios
                </Button>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator mt-20 flex flex-col items-center gap-2 opacity-40">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="relative py-24 px-4 overflow-hidden">
          <Orb style={{ width:400, height:400, top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"hsl(var(--primary)/0.07)" }} />
          <div className="relative z-10 container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="stat-card rounded-2xl p-8 text-center">
                    <div className="text-4xl md:text-5xl font-black shimmer-text mb-2">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO SHOWCASE ── */}
        <section className="relative py-24 px-4 overflow-hidden">
          <Orb style={{ width:500, height:500, top:0, right:"-10%", background:"hsl(var(--accent)/0.1)", animation:"orbFloat2 10s ease-in-out infinite" }} />

          <div className="relative z-10 container mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Discover</p>
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                Art That Moves{" "}
                <span className="shimmer-text">You</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Explore thousands of stunning portfolios from photographers around the world.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockPhotos.map((photo, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className={`photo-card rounded-2xl aspect-square bg-gradient-to-br ${photo.gradient} relative border border-white/5`}>
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    {/* Label */}
                    <div className="photo-label absolute bottom-4 left-4 right-4">
                      <span className="text-sm font-semibold text-foreground/90 bg-background/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                        {photo.label}
                      </span>
                    </div>
                    {/* Camera icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-white/10" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300} className="text-center mt-10">
              <Link to="/explore">
                <Button variant="outline" size="lg" className="rounded-full gap-2 group px-8"
                  style={{ background:"hsl(var(--card)/0.4)", backdropFilter:"blur(10px)" }}
                >
                  View All Portfolios
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="relative py-24 px-4 overflow-hidden">
          <Orb style={{ width:600, height:600, bottom:0, left:"-15%", background:"hsl(var(--primary)/0.12)", animation:"orbFloat 12s ease-in-out infinite" }} />

          <div className="relative z-10 container mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">Features</p>
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                Everything You{" "}
                <span className="shimmer-text">Need</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Powerful tools built specifically for the modern photographer's workflow.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Reveal key={i} delay={i * 80}>
                  <Link to={feature.link}>
                    <div className="glass-feature-card rounded-2xl p-8 h-full group">
                      <div
                        className="p-3 rounded-xl w-fit mb-5"
                        style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--accent)/0.1))" }}
                      >
                        <feature.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="relative py-24 px-4 overflow-hidden">
          <Orb style={{ width:400, height:400, top:"30%", right:"5%", background:"hsl(var(--accent)/0.1)", animation:"orbFloat3 9s ease-in-out infinite" }} />

          <div className="relative z-10 container mx-auto">
            <Reveal className="text-center mb-16">
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Loved by{" "}
                <span className="shimmer-text">Creators</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="glass-feature-card rounded-2xl p-8 flex flex-col gap-4">
                    <div className="flex gap-1">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.text}"</p>
                    <div className="mt-auto">
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-32 px-4 overflow-hidden">
          <Orb style={{ width:700, height:700, top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"hsl(var(--primary)/0.15)", animation:"orbFloat 8s ease-in-out infinite" }} />
          <Orb style={{ width:400, height:400, top:"20%", right:"-5%",  background:"hsl(var(--accent)/0.12)",  animation:"orbFloat2 10s ease-in-out infinite" }} />

          <div className="relative z-10 container mx-auto">
            <Reveal>
              <div
                className="cta-glow rounded-3xl p-16 text-center border"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--card)/0.7), hsl(var(--card)/0.3))",
                  backdropFilter: "blur(24px)",
                  borderColor: "hsl(var(--primary)/0.3)",
                }}
              >
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
                  style={{ background:"hsl(var(--primary)/0.1)", borderColor:"hsl(var(--primary)/0.3)" }}>
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Join 48,000+ Photographers</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Ready to Transform Your{" "}
                  <span className="shimmer-text">Photography Career?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Start your free account today and join a thriving community of professionals who are growing their business with CLICKSY.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/auth">
                    <Button size="lg" className="btn-accent-gradient text-base px-12 h-14 rounded-full gap-2 group">
                      <Award className="h-4 w-4" />
                      Start Free Today
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/learn">
                    <Button size="lg" variant="outline" className="text-base px-10 h-14 rounded-full"
                      style={{ background:"hsl(var(--card)/0.4)", backdropFilter:"blur(10px)" }}
                    >
                      Browse Tutorials
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;

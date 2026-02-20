import { Link } from "react-router-dom";
import { Camera, Aperture, ChevronLeft } from "lucide-react";

const FloatingOrb = ({
  size, color, top, left, delay, duration,
}: {
  size: number; color: string; top: string; left: string; delay: number; duration: number;
}) => (
  <div
    className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
    style={{
      width: size, height: size, background: color, top, left,
      animation: `orbFloat ${duration}s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

const ShutterParticle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute text-primary/10 pointer-events-none select-none" style={style}>
    <Aperture size={20} />
  </div>
);

const Section = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2
      className="text-lg font-bold mb-3 flex items-center gap-2"
      style={{ color: "hsl(14 100% 72%)" }}
    >
      <span
        className="text-xs font-black px-2 py-0.5 rounded-lg"
        style={{
          background: "linear-gradient(135deg, hsl(14 100% 65%), hsl(263 70% 50%))",
          color: "white",
        }}
      >
        {number}
      </span>
      {title}
    </h2>
    <div className="space-y-3 text-sm leading-relaxed" style={{ color: "hsl(240 5% 65%)" }}>
      {children}
    </div>
  </div>
);

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-2">
    <span style={{ color: "hsl(14 100% 65%)" }} className="mt-0.5 shrink-0">▸</span>
    <span>{children}</span>
  </div>
);

const Privacy = () => {
  const particles = [
    { top: "8%", left: "5%", size: 16, delay: 0, duration: 8 },
    { top: "15%", left: "88%", size: 20, delay: 1.2, duration: 10 },
    { top: "72%", left: "3%", size: 18, delay: 0.8, duration: 9 },
    { top: "85%", left: "80%", size: 22, delay: 1.8, duration: 11 },
    { top: "5%", left: "50%", size: 14, delay: 1, duration: 7.5 },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-12"
      style={{ background: "hsl(240 10% 3.9%)" }}
    >
      <style>{`
        @keyframes orbFloat {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-40px) scale(1.08); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.08; }
          50% { opacity: 0.15; }
          100% { transform: translateY(-60px) rotate(180deg); opacity: 0.06; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .page-appear { animation: fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      <FloatingOrb size={500} color="hsl(14 100% 65%)" top="-10%" left="-15%" delay={0} duration={12} />
      <FloatingOrb size={400} color="hsl(263 70% 50%)" top="55%" left="70%" delay={3} duration={14} />
      <FloatingOrb size={300} color="hsl(25 100% 60%)" top="30%" left="60%" delay={6} duration={10} />
      <FloatingOrb size={200} color="hsl(14 100% 65%)" top="80%" left="-5%" delay={1.5} duration={11} />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(14 100% 65%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(14 100% 65%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {particles.map((p, i) => (
        <ShutterParticle
          key={i}
          style={{
            top: p.top, left: p.left, fontSize: p.size,
            animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto page-appear">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3 group">
            <div
              className="p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(14 100% 65%), hsl(263 70% 50%))",
                boxShadow: "0 8px 32px hsl(14 100% 65% / 0.5)",
              }}
            >
              <Camera className="h-7 w-7 text-white" />
            </div>
            <span
              className="text-2xl font-black tracking-widest"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(14 100% 75%) 50%, hsl(263 70% 80%) 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              CLICKSY
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: "hsl(240 8% 6% / 0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid hsl(14 100% 65% / 0.2)",
            boxShadow: `0 0 0 1px hsl(14 100% 65% / 0.05),
              0 32px 80px -16px hsl(240 10% 3.9% / 0.8),
              0 0 60px -20px hsl(14 100% 65% / 0.15),
              inset 0 1px 0 hsl(0 0% 100% / 0.06)`,
          }}
        >
          {/* Header */}
          <div className="mb-8 pb-6" style={{ borderBottom: "1px solid hsl(240 6% 14%)" }}>
            <h1 className="text-3xl font-black text-foreground mb-2">Privacy Policy</h1>
            <p className="text-xs" style={{ color: "hsl(240 5% 40%)" }}>
              Last Updated: February 2026 &nbsp;·&nbsp; We believe in plain English
            </p>
          </div>

          {/* Intro */}
          <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(240 5% 65%)" }}>
            At <span style={{ color: "hsl(14 100% 72%)" }} className="font-semibold">CLICKSY</span>, we deeply respect your privacy. Our goal is to provide a seamless, inspiring platform for photographers and clients while being completely transparent about how your data is handled.
          </p>

          <Section number="1" title="The Golden Rule: We Do Not Sell Your Data">
            <p>
              Let's start with the most important point: <strong style={{ color: "hsl(0 0% 90%)" }}>We do not sell your personal data at any cost.</strong> We do not hand over your email, portfolio details, or browsing habits to third-party data brokers, marketers, or advertisers. Your data stays within the CLICKSY ecosystem.
            </p>
          </Section>

          <Section number="2" title="Information We Collect">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Account Data:</strong> When you sign up, we collect basic details like your name, email address, and account type (Client or Photographer).</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Content and Media:</strong> Any images, videos, text, and portfolio details you upload are stored securely on our cloud servers.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Browsing and Usage Data:</strong> We track how you interact with the platform — portfolios you visit, tutorials you watch, or marketplace items you browse.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Communications:</strong> We store messages you send through community forums and direct messaging features.</BulletItem>
          </Section>

          <Section number="3" title="How We Use Your Information">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Platform Operations:</strong> To maintain your portfolio, process your logins, and keep the platform running smoothly.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Personalized Recommendations:</strong> We use your browsing data to power our algorithms and show you relevant photographers, marketplace items, and tutorials.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Security and Support:</strong> To monitor for suspicious activity, prevent fraud, and respond to customer service requests.</BulletItem>
          </Section>

          <Section number="4" title="Important Security Disclosures">
            <div
              className="rounded-xl p-4 mb-3"
              style={{
                background: "hsl(14 100% 65% / 0.08)",
                border: "1px solid hsl(14 100% 65% / 0.2)",
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: "hsl(14 100% 72%)" }}>⚠ Please Read Carefully</p>
              <p className="text-xs" style={{ color: "hsl(240 5% 60%)" }}>
                <strong style={{ color: "hsl(0 0% 85%)" }}>Unencrypted Chats:</strong> As of right now, direct messages and community forum chats on CLICKSY are not end-to-end encrypted. Our system administrators technically have the ability to access these logs for moderation purposes. Please do not share sensitive personal or financial information via the chat feature.
              </p>
            </div>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Server Storage:</strong> All portfolio images, marketplace photos, and profile pictures are hosted on our centralized servers to ensure fast loading times.</BulletItem>
          </Section>

          <Section number="5" title="Publicly Shared Information">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Think Before You Post:</strong> Information you post on your public portfolio, community forums, and marketplace listings can be seen by anyone on the internet.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Your Responsibility:</strong> We are not responsible for what third parties do with information you willingly choose to make public. Exercise caution when sharing personal contact details or location data in public areas.</BulletItem>
          </Section>

          <Section number="6" title="Account Termination and Data Retention">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Violations:</strong> If an account violates our Terms of Service, we reserve the right to immediately terminate the account.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Data Deletion:</strong> Upon account deletion or termination, we will remove your public-facing portfolio and marketplace listings. However, we may retain certain administrative data (like email logs or ban records) for legal and security purposes.</BulletItem>
          </Section>

          <Section number="7" title="Changes to This Policy">
            <p>As CLICKSY grows and adds new features, we may update this Privacy Policy. We will notify you of any significant changes, but we encourage you to review this page periodically.</p>
          </Section>

          {/* Footer */}
          <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid hsl(240 6% 14%)" }}>
            <p className="text-xs" style={{ color: "hsl(240 5% 35%)" }}>
              © 2026 CLICKSY. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <Link to="/terms" style={{ color: "hsl(14 100% 65%)" }} className="hover:opacity-80 transition-opacity">Terms of Service</Link>
              <Link to="/auth" style={{ color: "hsl(240 5% 45%)" }} className="hover:opacity-80 transition-opacity">Back to Sign In</Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm transition-colors duration-200" style={{ color: "hsl(240 5% 45%)" }}>
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

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
      style={{ color: "hsl(263 70% 75%)" }}
    >
      <span
        className="text-xs font-black px-2 py-0.5 rounded-lg"
        style={{
          background: "linear-gradient(135deg, hsl(263 70% 50%), hsl(14 100% 65%))",
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
    <span style={{ color: "hsl(263 70% 60%)" }} className="mt-0.5 shrink-0">▸</span>
    <span>{children}</span>
  </div>
);

const Terms = () => {
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

      <FloatingOrb size={500} color="hsl(263 70% 50%)" top="-10%" left="-15%" delay={0} duration={12} />
      <FloatingOrb size={400} color="hsl(14 100% 65%)" top="55%" left="70%" delay={3} duration={14} />
      <FloatingOrb size={300} color="hsl(250 70% 55%)" top="30%" left="60%" delay={6} duration={10} />
      <FloatingOrb size={200} color="hsl(263 70% 50%)" top="80%" left="-5%" delay={1.5} duration={11} />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(263 70% 50%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(263 70% 50%) 1px, transparent 1px)`,
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
                background: "linear-gradient(135deg, hsl(263 70% 50%), hsl(14 100% 65%))",
                boxShadow: "0 8px 32px hsl(263 70% 50% / 0.5)",
              }}
            >
              <Camera className="h-7 w-7 text-white" />
            </div>
            <span
              className="text-2xl font-black tracking-widest"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(263 70% 80%) 50%, hsl(14 100% 75%) 100%)",
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
            border: "1px solid hsl(263 70% 50% / 0.2)",
            boxShadow: `0 0 0 1px hsl(263 70% 50% / 0.05),
              0 32px 80px -16px hsl(240 10% 3.9% / 0.8),
              0 0 60px -20px hsl(263 70% 50% / 0.15),
              inset 0 1px 0 hsl(0 0% 100% / 0.06)`,
          }}
        >
          {/* Header */}
          <div className="mb-8 pb-6" style={{ borderBottom: "1px solid hsl(240 6% 14%)" }}>
            <h1 className="text-3xl font-black text-foreground mb-2">Terms of Service</h1>
            <p className="text-xs" style={{ color: "hsl(240 5% 40%)" }}>
              Last Updated: February 2026 &nbsp;·&nbsp; Effective immediately upon account creation
            </p>
          </div>

          {/* Intro */}
          <p className="text-sm leading-relaxed mb-8" style={{ color: "hsl(240 5% 65%)" }}>
            Welcome to <span style={{ color: "hsl(263 70% 75%)" }} className="font-semibold">CLICKSY</span>! We are thrilled to have you join our community. CLICKSY is a comprehensive platform designed to connect photographers, clients, and photography enthusiasts through portfolios, bookings, community forums, learning resources, and a marketplace. By creating an account or using CLICKSY, you agree to these Terms of Service.
          </p>

          <Section number="1" title="Your Account and Identity">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Accuracy:</strong> You must provide accurate and current information when creating your account.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>No Impersonation:</strong> You may not create an account using someone else's identity, brand, or name, nor misrepresent your affiliations or photography experience.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Account Security:</strong> You are responsible for keeping your login credentials secure. If you suspect unauthorized access, notify us immediately.</BulletItem>
          </Section>

          <Section number="2" title="Content Ownership and Copyright">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>You Own Your Work:</strong> Photographers retain 100% ownership and copyright of all images, videos, and text they upload.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>License to Display:</strong> By uploading content, you grant CLICKSY a non-exclusive, worldwide, royalty-free license to display, host, and format your work solely to operate the platform.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>No Unauthorized Reuse:</strong> Users may not download, screenshot, scrape, redistribute, or reuse any content without explicit written permission from the copyright owner.</BulletItem>
          </Section>

          <Section number="3" title="Booking Services">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Independent Contractors:</strong> Photographers on CLICKSY are independent professionals, not employees or agents of CLICKSY.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Platform as a Venue:</strong> We provide the tools to connect, but we do not oversee photoshoots. CLICKSY is not responsible for photo quality, behavior, no-shows, or late deliveries.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Disputes:</strong> Any disputes regarding bookings, cancellations, and refunds must be resolved directly between the client and the photographer.</BulletItem>
          </Section>

          <Section number="4" title="The Marketplace">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Buyer Beware:</strong> CLICKSY does not own, inspect, or guarantee the condition or legality of any items listed. All transactions are made at your own risk.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Prohibited Items:</strong> You may not list stolen goods, counterfeit items, illegal materials, or items unrelated to photography.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Transaction Liability:</strong> We are not responsible for shipping issues, damaged goods, or fraudulent listings.</BulletItem>
          </Section>

          <Section number="5" title="Community Forums and Conduct">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Respectful Interaction:</strong> We do not tolerate hate speech, harassment, bullying, doxxing, or discrimination of any kind.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>No Spam:</strong> Using forums to spam links, aggressively self-promote, or distribute malware is strictly prohibited.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Moderation:</strong> CLICKSY reserves the right to remove any post or suspend forum privileges for users who violate these guidelines.</BulletItem>
          </Section>

          <Section number="6" title="Tutorials and Learning Resources">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Educational Purposes:</strong> Tutorials and guides are for educational purposes. CLICKSY does not guarantee specific results or career advancements.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Intellectual Property:</strong> You may not record, pirate, or distribute premium tutorials or courses found on CLICKSY.</BulletItem>
          </Section>

          <Section number="7" title="The Explore Page and Algorithms">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>Algorithmic Discovery:</strong> CLICKSY may utilize algorithms to power our Explore page, search, and recommendation features.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>No Guaranteed Visibility:</strong> We do not guarantee specific search rankings, profile visibility, or engagement. Content visibility is determined by automated systems.</BulletItem>
          </Section>

          <Section number="8" title="Financial Transactions & General Liability">
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>No Financial Involvement:</strong> CLICKSY does not process or guarantee payments between users for bookings, marketplace sales, or paid collaborations.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(0 0% 85%)" }}>No Liability:</strong> CLICKSY holds no responsibility for unpaid invoices, unfulfilled services, scams, or financial disputes between users.</BulletItem>
          </Section>

          <Section number="9" title="Strictly Prohibited Content">
            <BulletItem><strong style={{ color: "hsl(14 100% 70%)" }}>No Adult Content:</strong> Uploading sexually explicit material, pornography, or overly graphic content is strictly prohibited and will result in immediate account termination and permanent ban.</BulletItem>
            <BulletItem><strong style={{ color: "hsl(14 100% 70%)" }}>No Fraud:</strong> Any attempt to defraud users, manipulate systems, or use stolen financial information will be reported to appropriate authorities.</BulletItem>
          </Section>

          <Section number="10" title="Enforcement and Changes to Terms">
            <p>We reserve the right to suspend or terminate any account at any time, without notice, if we believe a user has violated these Terms, engaged in fraudulent activity, or compromised the safety of the CLICKSY community. We may update these terms as CLICKSY grows, and it is your responsibility to review them periodically.</p>
          </Section>

          {/* Footer */}
          <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid hsl(240 6% 14%)" }}>
            <p className="text-xs" style={{ color: "hsl(240 5% 35%)" }}>
              © 2026 CLICKSY. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <Link to="/privacy" style={{ color: "hsl(263 70% 65%)" }} className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
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

export default Terms;

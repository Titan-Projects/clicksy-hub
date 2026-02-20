import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Camera, Eye, EyeOff, Mail, Lock, User, ArrowRight, Aperture } from "lucide-react";
import { Link } from "react-router-dom";

// Animated floating orb component
const FloatingOrb = ({
  size,
  color,
  top,
  left,
  delay,
  duration,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
  duration: number;
}) => (
  <div
    className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
    style={{
      width: size,
      height: size,
      background: color,
      top,
      left,
      animation: `orbFloat ${duration}s ease-in-out ${delay}s infinite alternate`,
    }}
  />
);

// Floating camera shutter particles
const ShutterParticle = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute text-primary/10 pointer-events-none select-none"
    style={style}
  >
    <Aperture size={24} />
  </div>
);

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;
    const fullName = formData.get("full-name") as string;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      toast.success("Account created! Please check your email to verify.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("signin-email") as string;
    const password = formData.get("signin-password") as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const particles = [
    { top: "8%", left: "5%", size: 16, delay: 0, duration: 8 },
    { top: "15%", left: "88%", size: 20, delay: 1.2, duration: 10 },
    { top: "35%", left: "92%", size: 14, delay: 2.5, duration: 7 },
    { top: "72%", left: "3%", size: 18, delay: 0.8, duration: 9 },
    { top: "85%", left: "80%", size: 22, delay: 1.8, duration: 11 },
    { top: "55%", left: "96%", size: 12, delay: 3, duration: 6 },
    { top: "28%", left: "2%", size: 16, delay: 0.5, duration: 8.5 },
    { top: "90%", left: "45%", size: 18, delay: 2, duration: 9.5 },
    { top: "5%", left: "50%", size: 14, delay: 1, duration: 7.5 },
    { top: "62%", left: "60%", size: 10, delay: 3.5, duration: 6.5 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-12"
      style={{ background: "hsl(240 10% 3.9%)" }}
    >
      {/* Inject keyframe animation */}
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
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .auth-card-appear {
          animation: fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glass-input {
          background: hsl(240 8% 10% / 0.6) !important;
          border-color: hsl(263 70% 50% / 0.2) !important;
          color: hsl(0 0% 98%) !important;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .glass-input:focus {
          border-color: hsl(263 70% 50% / 0.6) !important;
          box-shadow: 0 0 0 3px hsl(263 70% 50% / 0.1), inset 0 0 20px hsl(263 70% 50% / 0.05) !important;
          outline: none !important;
        }
        .glass-input::placeholder {
          color: hsl(240 5% 45%);
        }
        .tab-glass {
          background: hsl(240 8% 8% / 0.7) !important;
          border: 1px solid hsl(263 70% 50% / 0.15) !important;
          backdrop-filter: blur(12px);
        }
        .tab-trigger-active {
          background: linear-gradient(135deg, hsl(263 70% 50%), hsl(250 70% 55%)) !important;
          color: white !important;
          box-shadow: 0 4px 20px hsl(263 70% 50% / 0.4) !important;
        }
      `}</style>

      {/* ── Animated Background Orbs ── */}
      <FloatingOrb size={500} color="hsl(263 70% 50%)" top="-10%" left="-15%" delay={0} duration={12} />
      <FloatingOrb size={400} color="hsl(14 100% 65%)" top="55%" left="70%" delay={3} duration={14} />
      <FloatingOrb size={300} color="hsl(250 70% 55%)" top="30%" left="60%" delay={6} duration={10} />
      <FloatingOrb size={250} color="hsl(14 100% 65%)" top="80%" left="-5%" delay={1.5} duration={11} />
      <FloatingOrb size={200} color="hsl(263 70% 50%)" top="10%" left="75%" delay={4} duration={9} />

      {/* ── Subtle Grid Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(263 70% 50%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(263 70% 50%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Floating Aperture Particles ── */}
      {particles.map((p, i) => (
        <ShutterParticle
          key={i}
          style={{
            top: p.top,
            left: p.left,
            fontSize: p.size,
            animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* ── Main Auth Card ── */}
      <div
        className={`relative w-full max-w-md z-10 ${mounted ? "auth-card-appear" : "opacity-0"}`}
      >
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
              <Camera className="h-8 w-8 text-white" />
            </div>
            <span
              className="text-3xl font-black tracking-widest"
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
            <p className="text-sm" style={{ color: "hsl(240 5% 55%)" }}>
              Capture. Share. Inspire.
            </p>
          </Link>
        </div>

        {/* Glass Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: "hsl(240 8% 6% / 0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid hsl(263 70% 50% / 0.2)",
            boxShadow: `
              0 0 0 1px hsl(263 70% 50% / 0.05),
              0 32px 80px -16px hsl(240 10% 3.9% / 0.8),
              0 0 60px -20px hsl(263 70% 50% / 0.15),
              inset 0 1px 0 hsl(0 0% 100% / 0.06)
            `,
          }}
        >
          <Tabs defaultValue="signin" className="w-full">
            {/* Tab List */}
            <TabsList className="tab-glass grid w-full grid-cols-2 mb-8 p-1 rounded-xl">
              <TabsTrigger
                value="signin"
                className="rounded-lg text-sm font-semibold transition-all duration-300 data-[state=active]:tab-trigger-active"
                style={{
                  color: "hsl(240 5% 55%)",
                }}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                  color: "hsl(240 5% 55%)",
                }}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* ── Sign In Tab ── */}
            <TabsContent value="signin" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
                <p className="text-sm mt-1" style={{ color: "hsl(240 5% 55%)" }}>
                  Sign in to continue your creative journey
                </p>
              </div>
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium" style={{ color: "hsl(240 5% 75%)" }}>
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(263 70% 60%)" }} />
                    <Input
                      id="signin-email"
                      name="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="glass-input pl-10 rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium" style={{ color: "hsl(240 5% 75%)" }}>
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(263 70% 60%)" }} />
                    <Input
                      id="signin-password"
                      name="signin-password"
                      type={showSignInPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="glass-input pl-10 pr-10 rounded-xl h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                      style={{ color: "hsl(240 5% 45%)" }}
                    >
                      {showSignInPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <button type="button" className="text-xs transition-colors duration-200"
                    style={{ color: "hsl(263 70% 65%)" }}
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                  style={{
                    background: "linear-gradient(135deg, hsl(263 70% 50%), hsl(250 70% 55%))",
                    boxShadow: loading ? "none" : "0 8px 32px hsl(263 70% 50% / 0.4)",
                  }}
                  onMouseEnter={e => {
                    if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  {loading ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            </TabsContent>

            {/* ── Sign Up Tab ── */}
            <TabsContent value="signup" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Create account</h2>
                <p className="text-sm mt-1" style={{ color: "hsl(240 5% 55%)" }}>
                  Join thousands of creators on CLICKSY
                </p>
              </div>
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="text-sm font-medium" style={{ color: "hsl(240 5% 75%)" }}>
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(14 100% 65%)" }} />
                    <Input
                      id="full-name"
                      name="full-name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="glass-input pl-10 rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium" style={{ color: "hsl(240 5% 75%)" }}>
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(14 100% 65%)" }} />
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="glass-input pl-10 rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium" style={{ color: "hsl(240 5% 75%)" }}>
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(14 100% 65%)" }} />
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type={showSignUpPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="glass-input pl-10 pr-10 rounded-xl h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                      style={{ color: "hsl(240 5% 45%)" }}
                    >
                      {showSignUpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs" style={{ color: "hsl(240 5% 45%)" }}>Minimum 6 characters</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
                  style={{
                    background: "linear-gradient(135deg, hsl(14 100% 65%), hsl(25 100% 60%))",
                    boxShadow: loading ? "none" : "0 8px 32px hsl(14 100% 65% / 0.4)",
                  }}
                  onMouseEnter={e => {
                    if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  {loading ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid hsl(240 6% 14%)" }}>
            <p className="text-center text-xs" style={{ color: "hsl(240 5% 40%)" }}>
              By continuing, you agree to our{" "}
              <span className="cursor-pointer" style={{ color: "hsl(263 70% 65%)" }}>Terms of Service</span>
              {" "}and{" "}
              <span className="cursor-pointer" style={{ color: "hsl(263 70% 65%)" }}>Privacy Policy</span>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm transition-colors duration-200"
            style={{ color: "hsl(240 5% 45%)" }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;

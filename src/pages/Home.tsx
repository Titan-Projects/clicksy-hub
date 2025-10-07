import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Users, BookOpen, ShoppingBag, Calendar, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Portfolio Showcase",
      description: "Create stunning galleries to showcase your photography work",
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Manage bookings and payments seamlessly in one place",
    },
    {
      icon: Users,
      title: "Collaborate",
      description: "Connect with photographers and learners worldwide",
    },
    {
      icon: BookOpen,
      title: "Learn & Grow",
      description: "Access tutorials and resources to improve your skills",
    },
    {
      icon: ShoppingBag,
      title: "Marketplace",
      description: "Buy or rent photography equipment from trusted sellers",
    },
    {
      icon: Sparkles,
      title: "Community",
      description: "Join discussions and share experiences with fellow photographers",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            One Click,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Infinite Possibilities
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            The ultimate platform for photographers to showcase, connect, and grow their business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/auth">
              <Button size="lg" className="btn-primary-gradient text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Explore Portfolios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features to elevate your photography business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-border bg-card">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Photography Career?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of photographers already using CLICKSY
              </p>
              <Link to="/auth">
                <Button size="lg" className="btn-accent-gradient text-lg px-8">
                  Start Free Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

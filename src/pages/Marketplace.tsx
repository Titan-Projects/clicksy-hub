import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
  const items = [
    {
      id: 1,
      name: "Canon EOS R5",
      price: "$3,899",
      type: "For Sale",
      location: "New York, NY",
    },
    {
      id: 2,
      name: "Sony A7 III with Lens Kit",
      price: "$150/day",
      type: "For Rent",
      location: "Los Angeles, CA",
    },
    {
      id: 3,
      name: "Professional Studio Lighting Set",
      price: "$899",
      type: "For Sale",
      location: "Chicago, IL",
    },
    {
      id: 4,
      name: "DJI Ronin RS3 Pro Gimbal",
      price: "$75/day",
      type: "For Rent",
      location: "Miami, FL",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Equipment Marketplace
            </h1>
            <p className="text-xl text-muted-foreground">
              Buy or rent professional photography equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="card-hover">
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4"></div>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.type === "For Sale" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-accent/10 text-accent"
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  <CardDescription>{item.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketplace;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const Learn = () => {
  const resources = [
    {
      id: 1,
      title: "Photography Basics for Beginners",
      description: "Learn the fundamentals of photography and camera settings",
      category: "Beginner",
      duration: "45 min",
    },
    {
      id: 2,
      title: "Advanced Lighting Techniques",
      description: "Master natural and artificial lighting for professional results",
      category: "Advanced",
      duration: "1.5 hours",
    },
    {
      id: 3,
      title: "Portrait Photography Masterclass",
      description: "Perfect your portrait photography skills and client interaction",
      category: "Intermediate",
      duration: "2 hours",
    },
    {
      id: 4,
      title: "Post-Processing with Lightroom",
      description: "Edit your photos like a pro with Adobe Lightroom",
      category: "Intermediate",
      duration: "1 hour",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learning Resources
            </h1>
            <p className="text-xl text-muted-foreground">
              Enhance your photography skills with expert tutorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <Card key={resource.id} className="card-hover cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="flex-1">{resource.title}</CardTitle>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm whitespace-nowrap ml-2">
                      {resource.category}
                    </span>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Duration: {resource.duration}</p>
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

export default Learn;

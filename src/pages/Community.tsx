import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const Community = () => {
  const discussions = [
    {
      id: 1,
      title: "Best Camera Settings for Outdoor Portraits",
      author: "Sarah Johnson",
      replies: 23,
      category: "Tips & Tricks",
    },
    {
      id: 2,
      title: "How to Build Your Photography Portfolio",
      author: "Mike Chen",
      replies: 15,
      category: "Career",
    },
    {
      id: 3,
      title: "Natural Light vs Studio Light Discussion",
      author: "Emma Davis",
      replies: 42,
      category: "Techniques",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Community Forum
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect, learn, and share with fellow photographers
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="card-hover cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{discussion.title}</CardTitle>
                      <CardDescription>
                        Started by {discussion.author} · {discussion.replies} replies
                      </CardDescription>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {discussion.category}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;

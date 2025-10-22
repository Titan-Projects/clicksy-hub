import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Eye, Search, TrendingUp, Camera, Users } from "lucide-react";

interface Photo {
  id: string;
  title: string;
  photo_url: string;
  likes_count: number;
  views_count: number;
  category: string;
  user_id: string;
  profiles: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
}

interface Photographer {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  specialty: string;
  followers_count: number;
  total_photos: number;
}

const Explore = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExploreData();
  }, []);

  const fetchExploreData = async () => {
    try {
      // Fetch featured photos
      const { data: photosData } = await supabase
        .from("photos")
        .select(`
          *,
          profiles (username, full_name, avatar_url)
        `)
        .order("views_count", { ascending: false })
        .limit(12);

      setPhotos(photosData || []);

      // Fetch top photographers
      const { data: photographersData } = await supabase
        .from("profiles")
        .select("*")
        .order("followers_count", { ascending: false })
        .limit(8);

      setPhotographers(photographersData || []);
    } catch (error) {
      console.error("Error fetching explore data:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Wedding",
    "Portrait",
    "Landscape",
    "Wildlife",
    "Fashion",
    "Street",
    "Product",
    "Event"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-gradient">Amazing Photography</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover talented photographers and stunning visual stories
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search photos, photographers, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Camera className="h-6 w-6 text-primary" />
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button key={category} variant="outline" className="rounded-full">
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="photos">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending Photos
              </TabsTrigger>
              <TabsTrigger value="photographers">
                <Users className="mr-2 h-4 w-4" />
                Top Photographers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo) => (
                  <Card
                    key={photo.id}
                    className="card-hover overflow-hidden cursor-pointer group"
                    onClick={() => navigate(`/profile/${photo.user_id}`)}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={photo.photo_url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="image-overlay opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span className="text-sm">{photo.likes_count}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span className="text-sm">{photo.views_count}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{photo.title}</h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={photo.profiles?.avatar_url} />
                          <AvatarFallback>
                            {photo.profiles?.username?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {photo.profiles?.full_name || photo.profiles?.username}
                        </span>
                      </div>
                      {photo.category && (
                        <Badge variant="secondary" className="mt-2">
                          {photo.category}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {photos.length === 0 && (
                <div className="text-center py-12">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No photos found</h3>
                  <p className="text-muted-foreground">
                    Be the first to share your photography!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="photographers">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {photographers.map((photographer) => (
                  <Card
                    key={photographer.id}
                    className="card-hover cursor-pointer"
                    onClick={() => navigate(`/profile/${photographer.id}`)}
                  >
                    <CardContent className="p-6 text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={photographer.avatar_url} />
                        <AvatarFallback className="text-2xl">
                          {photographer.full_name?.charAt(0) || photographer.username?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h3 className="font-semibold text-lg mb-1">
                        {photographer.full_name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        @{photographer.username}
                      </p>

                      {photographer.specialty && (
                        <Badge variant="secondary" className="mb-4">
                          {photographer.specialty}
                        </Badge>
                      )}

                      <div className="flex justify-around text-sm border-t pt-4">
                        <div>
                          <p className="font-bold text-lg">{photographer.total_photos}</p>
                          <p className="text-muted-foreground">Photos</p>
                        </div>
                        <div>
                          <p className="font-bold text-lg">{photographer.followers_count}</p>
                          <p className="text-muted-foreground">Followers</p>
                        </div>
                      </div>

                      <Button className="w-full mt-4 btn-primary-gradient">
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {photographers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No photographers yet</h3>
                  <p className="text-muted-foreground">
                    Be the first to join our community!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;

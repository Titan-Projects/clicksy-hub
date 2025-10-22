import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Globe, Calendar, Camera, Heart, Eye, UserPlus, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  location: string;
  website: string;
  avatar_url: string;
  cover_photo_url: string;
  specialty: string;
  experience_years: number;
  hourly_rate: number;
  total_bookings: number;
  total_photos: number;
  followers_count: number;
  following_count: number;
  created_at: string;
}

interface Photo {
  id: string;
  title: string;
  photo_url: string;
  likes_count: number;
  views_count: number;
}

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchProfile();
    checkCurrentUser();
  }, [userId]);

  const checkCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchProfile = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      const { data: photosData } = await supabase
        .from("photos")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(12);

      setPhotos(photosData || []);

      if (currentUser) {
        const { data: followData } = await supabase
          .from("follows")
          .select("*")
          .eq("follower_id", currentUser.id)
          .eq("following_id", userId)
          .single();
        
        setIsFollowing(!!followData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    try {
      if (isFollowing) {
        await supabase
          .from("follows")
          .delete()
          .eq("follower_id", currentUser.id)
          .eq("following_id", userId);
      } else {
        await supabase
          .from("follows")
          .insert({ follower_id: currentUser.id, following_id: userId });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following:", error);
    }
  };

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

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === userId;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Cover Photo */}
        <div className="relative h-80 bg-gradient-to-br from-primary/20 to-accent/20">
          {profile.cover_photo_url && (
            <img
              src={profile.cover_photo_url}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="container mx-auto px-4 -mt-20">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            {/* Left Sidebar - Profile Card */}
            <div>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                      <AvatarImage src={profile.avatar_url} />
                      <AvatarFallback className="text-2xl">
                        {profile.full_name?.charAt(0) || profile.username?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <h1 className="mt-4 text-2xl font-bold">{profile.full_name}</h1>
                    <p className="text-muted-foreground">@{profile.username}</p>

                    {profile.specialty && (
                      <Badge variant="secondary" className="mt-2">
                        {profile.specialty}
                      </Badge>
                    )}

                    {isOwnProfile ? (
                      <Button
                        className="w-full mt-4"
                        onClick={() => navigate("/settings")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        className="w-full mt-4 btn-primary-gradient"
                        onClick={handleFollow}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    )}

                    {profile.bio && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        {profile.bio}
                      </p>
                    )}

                    <div className="w-full mt-6 space-y-3">
                      {profile.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      
                      {profile.website && (
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Website
                          </a>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {new Date(profile.created_at).getFullYear()}</span>
                      </div>

                      {profile.experience_years && (
                        <div className="flex items-center gap-2 text-sm">
                          <Camera className="h-4 w-4 text-muted-foreground" />
                          <span>{profile.experience_years} years experience</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">{profile.total_photos}</p>
                        <p className="text-xs text-muted-foreground">Photos</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{profile.followers_count}</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{profile.following_count}</p>
                        <p className="text-xs text-muted-foreground">Following</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Content - Tabs */}
            <div>
              <Tabs defaultValue="portfolio" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="portfolio" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <img
                          src={photo.photo_url}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="image-overlay opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4">
                            <div className="flex items-center gap-1 text-white">
                              <Heart className="h-5 w-5" />
                              <span>{photo.likes_count}</span>
                            </div>
                            <div className="flex items-center gap-1 text-white">
                              <Eye className="h-5 w-5" />
                              <span>{photo.views_count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {photos.length === 0 && (
                    <div className="text-center py-12">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No photos yet</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">About</h3>
                      <div className="space-y-4">
                        {profile.bio && (
                          <div>
                            <h4 className="font-medium mb-2">Bio</h4>
                            <p className="text-muted-foreground">{profile.bio}</p>
                          </div>
                        )}
                        
                        {profile.specialty && (
                          <div>
                            <h4 className="font-medium mb-2">Specialty</h4>
                            <p className="text-muted-foreground">{profile.specialty}</p>
                          </div>
                        )}

                        {profile.hourly_rate && (
                          <div>
                            <h4 className="font-medium mb-2">Hourly Rate</h4>
                            <p className="text-2xl font-bold text-primary">
                              ${profile.hourly_rate}/hr
                            </p>
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium mb-2">Statistics</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Bookings</p>
                              <p className="text-xl font-semibold">{profile.total_bookings}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Experience</p>
                              <p className="text-xl font-semibold">
                                {profile.experience_years} years
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6 text-center py-12">
                      <p className="text-muted-foreground">Reviews coming soon</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

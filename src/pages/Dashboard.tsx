import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign,
  Image as ImageIcon,
  Upload,
  Eye,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);
    await fetchDashboardData(user.id);
  };

  const fetchDashboardData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      setProfile(profileData);

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("*")
        .or(`photographer_id.eq.${userId},client_id.eq.${userId}`)
        .order("created_at", { ascending: false });

      setBookings(bookingsData || []);

      // Fetch photos
      const { data: photosData } = await supabase
        .from("photos")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(6);

      setPhotos(photosData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => 
    b.status === 'confirmed' && new Date(b.event_date) > new Date()
  ).length;

  const totalRevenue = bookings
    .filter(b => b.status === 'completed' && b.photographer_id === user?.id)
    .reduce((sum, b) => sum + (b.total_price || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {profile?.full_name || "Photographer"}!
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your photography business
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Photos
                </CardTitle>
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{profile?.total_photos || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  In your portfolio
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming Bookings
                </CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{upcomingBookings}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Confirmed events
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Followers
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{profile?.followers_count || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  People following you
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  From completed bookings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="photos">Recent Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your photography business</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button className="h-auto py-6 flex flex-col gap-2" onClick={() => navigate("/portfolio")}>
                      <Upload className="h-6 w-6" />
                      <span>Upload Photos</span>
                    </Button>
                    <Button className="h-auto py-6 flex flex-col gap-2" variant="outline" onClick={() => navigate("/booking")}>
                      <Calendar className="h-6 w-6" />
                      <span>Manage Bookings</span>
                    </Button>
                    <Button className="h-auto py-6 flex flex-col gap-2" variant="outline" onClick={() => navigate("/settings")}>
                      <Camera className="h-6 w-6" />
                      <span>Edit Profile</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest bookings and uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{booking.event_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.event_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        booking.status === 'completed' ? 'default' :
                        booking.status === 'confirmed' ? 'secondary' :
                        'outline'
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                  
                  {bookings.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No bookings yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>Manage your photography bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{booking.event_type}</h4>
                            <p className="text-sm text-muted-foreground">{booking.event_location}</p>
                          </div>
                          <Badge variant={
                            booking.status === 'completed' ? 'default' :
                            booking.status === 'confirmed' ? 'secondary' :
                            'outline'
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>📅 {new Date(booking.event_date).toLocaleDateString()}</span>
                          {booking.duration_hours && <span>⏱️ {booking.duration_hours}h</span>}
                          {booking.total_price && <span>💰 ${booking.total_price}</span>}
                        </div>
                      </div>
                    ))}
                    
                    {bookings.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No bookings yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Photos</CardTitle>
                  <CardDescription>Your latest uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img
                          src={photo.photo_url}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
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
                    ))}
                  </div>

                  {photos.length === 0 && (
                    <div className="text-center py-12">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No photos uploaded yet</p>
                      <Button onClick={() => navigate("/portfolio")}>
                        Upload Your First Photo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

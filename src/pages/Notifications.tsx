import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Heart, MessageCircle, UserPlus, Calendar } from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
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
    setLoading(false);
  };

  // Mock notifications data (replace with real data from database later)
  const notifications = [
    {
      id: 1,
      type: "follow",
      user: { name: "Sarah Johnson", avatar: "", username: "sarahj" },
      message: "started following you",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "like",
      user: { name: "Mike Chen", avatar: "", username: "mikechen" },
      message: "liked your photo 'Sunset Dreams'",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "booking",
      user: { name: "Emily Davis", avatar: "", username: "emilyd" },
      message: "confirmed your booking for Wedding Photography",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "comment",
      user: { name: "Alex Thompson", avatar: "", username: "alexthompson" },
      message: "commented on your photo",
      time: "2 days ago",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "follow":
        return <UserPlus className="h-5 w-5 text-primary" />;
      case "like":
        return <Heart className="h-5 w-5 text-accent" />;
      case "comment":
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case "booking":
        return <Calendar className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your activity
              </p>
            </div>
            <Button variant="outline" size="sm">
              <BellOff className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`card-hover cursor-pointer transition-all ${
                  !notification.read ? "border-primary/50 bg-primary/5" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>

                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback>
                        {notification.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold">
                          {notification.user.name}
                        </span>{" "}
                        <span className="text-muted-foreground">
                          {notification.message}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>

                    {!notification.read && (
                      <Badge variant="default" className="flex-shrink-0">
                        New
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-16">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
              <p className="text-muted-foreground">
                When you get notifications, they'll show up here
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;

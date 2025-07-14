import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, User, Bell, History, Lock, HelpCircle, LogOut } from "lucide-react";
import type { User as UserType, UserProfile } from "@shared/schema";

export default function Settings() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: profileData } = useQuery<UserProfile>({
    queryKey: ["/api/profile"],
    enabled: !!user,
    retry: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "로그인이 필요합니다",
        description: "로그인 페이지로 이동합니다...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [authLoading, user, toast]);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleEditProfile = () => {
    setLocation("/profile-setup");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mystical-gold border-t-transparent rounded-full animate-spin mx-auto mb-4 glow-gold"></div>
          <p className="text-star-silver">신비로운 설정을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const getUserInitial = (user: UserType) => {
    if (user.firstName) return user.firstName.charAt(0);
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mystical-card border-b border-ethereal-violet/30 p-4 flex items-center space-x-3 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-ethereal-violet/20 text-moonlight"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h3 className="font-semibold font-mystical text-moonlight">운명 설정</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <Card className="mystical-card glow-purple border-ethereal-violet/30">
          <CardContent className="p-6 relative overflow-hidden">
            {/* Mystical background elements */}
            <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-mystical-gold/10 to-transparent rounded-full blur-sm"></div>
            <div className="absolute bottom-2 left-4 w-12 h-12 bg-gradient-to-tr from-ethereal-violet/10 to-transparent rounded-full blur-sm"></div>
            
            <div className="flex items-center space-x-4 mb-4 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-mystical-purple to-ethereal-violet rounded-full flex items-center justify-center glow-purple">
                <span className="text-white text-xl font-bold font-mystical">
                  {getUserInitial(user)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold font-mystical text-moonlight">
                  {user.firstName || user.email?.split('@')[0] || "운명의 구도자"}
                </h3>
                <p className="text-star-silver text-sm">{user.email}</p>
                {profileData && (
                  <p className="text-mystical-gold/80 text-xs mt-1">
                    {new Date(profileData.birthDate).toLocaleDateString('ko-KR')} • {profileData.birthLocation}
                  </p>
                )}
              </div>
            </div>
            <Button 
              variant="outline"
              className="w-full bg-ethereal-violet/20 border-mystical-gold/30 text-moonlight hover:bg-ethereal-violet/30 hover:border-mystical-gold/50 font-mystical"
              onClick={handleEditProfile}
            >
              운명 프로필 수정
            </Button>
          </CardContent>
        </Card>

        {/* Settings List */}
        <div className="space-y-2">
          <button
            className="w-full mystical-card hover:glow-purple border border-ethereal-violet/30 hover:border-mystical-purple/50 flex items-center justify-between p-4 rounded-lg transition-all"
            onClick={handleEditProfile}
          >
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-mystical-gold" />
              <span className="text-moonlight font-mystical">기본정보 수정</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-star-silver rotate-180" />
          </button>

          <button className="w-full mystical-card hover:glow-purple border border-ethereal-violet/30 hover:border-mystical-purple/50 flex items-center justify-between p-4 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-mystical-gold" />
              <span className="text-moonlight font-mystical">신비한 알림 설정</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-star-silver rotate-180" />
          </button>

          <button className="w-full mystical-card hover:glow-purple border border-ethereal-violet/30 hover:border-mystical-purple/50 flex items-center justify-between p-4 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <History className="h-5 w-5 text-mystical-gold" />
              <span className="text-moonlight font-mystical">운명의 기록</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-star-silver rotate-180" />
          </button>

          <button className="w-full mystical-card hover:glow-purple border border-ethereal-violet/30 hover:border-mystical-purple/50 flex items-center justify-between p-4 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-mystical-gold" />
              <span className="text-moonlight font-mystical">개인정보 보호</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-star-silver rotate-180" />
          </button>

          <button className="w-full mystical-card hover:glow-purple border border-ethereal-violet/30 hover:border-mystical-purple/50 flex items-center justify-between p-4 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-mystical-gold" />
              <span className="text-moonlight font-mystical">신비한 도움말</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-star-silver rotate-180" />
          </button>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-ethereal-violet/30">
          <Button
            variant="destructive"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 shadow-lg font-mystical"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            운명에서 떠나기
          </Button>
        </div>
      </div>
    </div>
  );
}

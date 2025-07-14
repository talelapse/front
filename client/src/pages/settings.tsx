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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mystical-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h3 className="font-semibold text-gray-800">설정</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-mystical-purple rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {getUserInitial(user)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {user.firstName || user.email?.split('@')[0] || "사용자"}
                </h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                {profileData && (
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(profileData.birthDate).toLocaleDateString('ko-KR')} • {profileData.birthLocation}
                  </p>
                )}
              </div>
            </div>
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleEditProfile}
            >
              프로필 수정
            </Button>
          </CardContent>
        </Card>

        {/* Settings List */}
        <div className="space-y-1">
          <button
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleEditProfile}
          >
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">기본정보 수정</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">알림 설정</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <History className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">운세 히스토리</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">개인정보 처리방침</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">고객지원</span>
            </div>
            <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
          </button>
        </div>

        {/* Logout */}
        <div className="pt-6 border-t">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}

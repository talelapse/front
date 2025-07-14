import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Settings, Bell, ArrowDown, Sparkles, Star, Calendar, MapPin, ChevronRight } from "lucide-react";
import type { User, UserProfile, FortuneSession } from "@shared/schema";

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect to profile setup if profile is not complete
  const { data: profileData, error: profileError } = useQuery({
    queryKey: ["/api/profile"],
    enabled: !!user,
    retry: false,
  });

  const { data: sessions = [] } = useQuery<FortuneSession[]>({
    queryKey: ["/api/fortune/sessions"],
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

    // If profile doesn't exist (404 error) or profile exists but not complete, redirect to setup
    if (user && (profileError || (profileData && !profileData.isSetupComplete))) {
      setLocation("/profile-setup");
    }
  }, [authLoading, user, profileData, profileError, setLocation, toast]);

  const startFortuneMutation = useMutation({
    mutationFn: async ({ fortuneType, title }: { fortuneType: string; title: string }) => {
      const response = await apiRequest("POST", "/api/fortune/sessions", {
        fortuneType,
        title,
      });
      return response.json();
    },
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: ["/api/fortune/sessions"] });
      setLocation(`/chat/${session.id}`);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "오류가 발생했습니다",
        description: "운세 상담을 시작할 수 없습니다.",
        variant: "destructive",
      });
    },
  });

  const handleStartFortune = (fortuneType: string, title: string) => {
    startFortuneMutation.mutate({ fortuneType, title });
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mystical-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // If we have user but no profile data (and no error), still loading
  if (!profileData && !profileError) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mystical-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">프로필 정보를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  const recentSessions = sessions.slice(0, 3);

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="text-mystical-purple h-8 w-8" />
              <div>
                <h1 className="text-lg font-bold text-gray-800">FateChat</h1>
                <p className="text-sm text-gray-600">
                  {user.firstName || user.email}님
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setLocation("/settings")}
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-mystical-purple to-purple-600 text-white mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">
              안녕하세요, {user.firstName || user.email?.split('@')[0]}님!
            </h2>
            <p className="text-purple-100 mb-4">오늘은 어떤 운세가 궁금하신가요?</p>
            {profileData && (
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(profileData.birthDate).toLocaleDateString('ko-KR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.birthLocation}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* 사주 */}
          <Card className="group hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <ArrowDown className="text-mystical-purple h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">사주팔자</h3>
              <p className="text-gray-600 text-sm mb-4">생년월일을 바탕으로 한 정통 사주 풀이</p>
              <Button 
                className="w-full bg-mystical-purple hover:bg-purple-700"
                onClick={() => handleStartFortune('saju', '사주 상담')}
                disabled={startFortuneMutation.isPending}
              >
                시작하기
              </Button>
            </CardContent>
          </Card>

          {/* 타로 */}
          <Card className="group hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Sparkles className="text-mystical-gold h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">타로</h3>
              <p className="text-gray-600 text-sm mb-4">카드가 전하는 신비로운 메시지</p>
              <Button 
                className="w-full bg-mystical-gold hover:bg-yellow-500"
                onClick={() => handleStartFortune('tarot', '타로 상담')}
                disabled={startFortuneMutation.isPending}
              >
                시작하기
              </Button>
            </CardContent>
          </Card>

          {/* 점성술 */}
          <Card className="group hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                <Star className="text-indigo-600 h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">점성술</h3>
              <p className="text-gray-600 text-sm mb-4">별자리와 행성으로 보는 운세</p>
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleStartFortune('astrology', '점성술 상담')}
                disabled={startFortuneMutation.isPending}
              >
                시작하기
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent History */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">최근 운세</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-mystical-purple hover:bg-purple-50"
                onClick={() => setLocation("/settings")}
              >
                전체 보기
              </Button>
            </div>

            {recentSessions.length > 0 ? (
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => {
                      if (session.isCompleted) {
                        setLocation(`/result/${session.id}`);
                      } else {
                        setLocation(`/chat/${session.id}`);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        {session.fortuneType === 'saju' && <ArrowDown className="text-mystical-purple h-5 w-5" />}
                        {session.fortuneType === 'tarot' && <Sparkles className="text-mystical-gold h-5 w-5" />}
                        {session.fortuneType === 'astrology' && <Star className="text-indigo-600 h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{session.title}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(session.createdAt!).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>아직 운세 상담 기록이 없습니다.</p>
                <p className="text-sm">위의 운세 카드를 선택해서 시작해보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

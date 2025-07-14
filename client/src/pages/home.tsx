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
import FortuneCards from "@/components/fortune-cards";
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="mystical-card shadow-lg shadow-mystical-purple/20 sticky top-0 z-10 border-b border-ethereal-violet/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="text-mystical-gold h-8 w-8 glow-gold" />
              <div>
                <h1 className="text-lg font-bold font-mystical text-moonlight">FateChat</h1>
                <p className="text-sm text-star-silver">
                  {user.firstName || user.email}님의 운명
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-moonlight hover:bg-ethereal-violet/20 hover:glow-purple"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-moonlight hover:bg-ethereal-violet/20 hover:glow-purple"
                onClick={() => setLocation("/settings")}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <Card className="mystical-card glow-purple mb-8 border border-ethereal-violet/30">
          <CardContent className="p-6 relative overflow-hidden">
            {/* Mystical background elements */}
            <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-mystical-gold/10 to-transparent rounded-full blur-sm"></div>
            <div className="absolute bottom-2 left-4 w-12 h-12 bg-gradient-to-tr from-ethereal-violet/10 to-transparent rounded-full blur-sm"></div>
            
            <h2 className="text-2xl font-bold font-mystical mb-2 text-moonlight">
              안녕하세요, {user.firstName || user.email?.split('@')[0]}님!
            </h2>
            <p className="text-star-silver mb-4">오늘은 어떤 운명의 신비가 궁금하신가요?</p>
            {profileData && (
              <div className="flex items-center space-x-4 text-sm text-star-silver">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-mystical-gold" />
                  <span>{new Date(profileData.birthDate).toLocaleDateString('ko-KR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-mystical-gold" />
                  <span>{profileData.birthLocation}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mystical Fortune Cards */}
        <div className="mb-8">
          <FortuneCards 
            onSelectFortune={handleStartFortune}
            isLoading={startFortuneMutation.isPending}
          />
        </div>

        {/* Recent History */}
        <Card className="mystical-card glow-purple border-ethereal-violet/30">
          <CardContent className="p-6 relative overflow-hidden">
            {/* Mystical background elements */}
            <div className="absolute top-4 right-6 w-16 h-16 bg-gradient-to-br from-mystical-gold/5 to-transparent rounded-full blur-lg"></div>
            <div className="absolute bottom-4 left-6 w-12 h-12 bg-gradient-to-tr from-ethereal-violet/5 to-transparent rounded-full blur-lg"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-lg font-semibold font-mystical text-moonlight">운명의 기록</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-mystical-gold hover:bg-ethereal-violet/20 hover:glow-gold"
                onClick={() => setLocation("/history")}
              >
                모든 기록 보기
              </Button>
            </div>

            {recentSessions.length > 0 ? (
              <div className="space-y-3 relative z-10">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="mystical-card border border-ethereal-violet/30 hover:border-mystical-purple/50 hover:glow-purple flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer"
                    onClick={() => {
                      if (session.isCompleted) {
                        setLocation(`/result/${session.id}`);
                      } else {
                        setLocation(`/chat/${session.id}`);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ethereal-violet/30 rounded-full flex items-center justify-center">
                        {session.fortuneType === 'saju' && <ArrowDown className="text-mystical-purple h-5 w-5" />}
                        {session.fortuneType === 'tarot' && <Sparkles className="text-mystical-gold h-5 w-5" />}
                        {session.fortuneType === 'astrology' && <Star className="text-cosmic-indigo h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium font-mystical text-moonlight">{session.title}</h4>
                        <p className="text-sm text-star-silver">
                          {new Date(session.createdAt!).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-mystical-gold" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-star-silver relative z-10">
                <p className="font-mystical">아직 운명의 기록이 없습니다.</p>
                <p className="text-sm text-star-silver/60">위의 신비로운 카드를 선택해서 운명을 탐험해보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

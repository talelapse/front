import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowDown, Sparkles, Star, ChevronRight, MessageCircle, Book } from "lucide-react";
import type { FortuneSession } from "@shared/schema";

export default function History() {
  const [, setLocation] = useLocation();

  const { data: recentSessions = [], isLoading: recentLoading } = useQuery<FortuneSession[]>({
    queryKey: ["/api/fortune/sessions/recent?hours=24"],
  });

  const { data: storybookData, isLoading: storybookLoading } = useQuery<{
    story: string | null;
    sessionCount: number;
    oldestDate: string;
    newestDate: string;
  }>({
    queryKey: ["/api/fortune/storybook?hours=24"],
  });

  const getFortuneTypeText = (type: string) => {
    switch (type) {
      case 'saju':
        return '사주팔자';
      case 'tarot':
        return '타로';
      case 'astrology':
        return '별자리';
      case 'casual':
        return '이야기';
      default:
        return type;
    }
  };

  const getFortuneIcon = (type: string) => {
    switch (type) {
      case 'saju':
        return <ArrowDown className="text-mystical-purple h-5 w-5" />;
      case 'tarot':
        return <Sparkles className="text-mystical-gold h-5 w-5" />;
      case 'astrology':
        return <Star className="text-cosmic-indigo h-5 w-5" />;
      case 'casual':
        return <MessageCircle className="text-emerald-400 h-5 w-5" />;
      default:
        return <ArrowDown className="text-mystical-purple h-5 w-5" />;
    }
  };

  if (recentLoading || storybookLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-navy via-shadow-purple to-cosmic-indigo">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mystical-gold mx-auto mb-4"></div>
              <p className="text-star-silver font-mystical">이야기를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-shadow-purple to-cosmic-indigo">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-mystical-gold hover:bg-ethereal-violet/20 hover:glow-gold"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-3xl font-bold font-mystical text-moonlight">이야기 기록</h1>
          </div>
        </div>

        {/* Storybook Summary */}
        {storybookData?.story && (
          <Card className="bg-gradient-to-br from-amber-900/20 to-orange-800/20 border-amber-500/30 backdrop-blur-md mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Book className="text-amber-400 h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-100 font-mystical">지난 이야기들</h3>
                  <p className="text-amber-300/80 text-sm">
                    {storybookData.sessionCount}개의 대화가 하나의 이야기로
                  </p>
                </div>
              </div>
              <div className="prose prose-amber prose-invert max-w-none">
                <div className="text-amber-100/90 leading-relaxed whitespace-pre-line text-sm">
                  {storybookData.story}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Sessions */}
        <Card className="mystical-card glow-purple border-ethereal-violet/30">
          <CardContent className="p-6 relative overflow-hidden">
            {/* Mystical background elements */}
            <div className="absolute top-4 right-6 w-20 h-20 bg-gradient-to-br from-mystical-gold/5 to-transparent rounded-full blur-lg"></div>
            <div className="absolute bottom-4 left-6 w-16 h-16 bg-gradient-to-tr from-ethereal-violet/5 to-transparent rounded-full blur-lg"></div>
            
            <h3 className="text-xl font-bold text-white font-mystical mb-6 relative z-10">최근 24시간</h3>
            
            {recentSessions.length > 0 ? (
              <div className="space-y-4 relative z-10">
                <p className="text-star-silver mb-6 font-mystical">
                  {recentSessions.length}개의 최근 이야기가 있습니다.
                </p>
                
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="mystical-card border border-ethereal-violet/30 hover:border-mystical-purple/50 hover:glow-purple flex items-center justify-between p-6 rounded-lg transition-all cursor-pointer"
                    onClick={() => {
                      if (session.isCompleted) {
                        setLocation(`/result/${session.id}`);
                      } else {
                        setLocation(`/chat/${session.id}`);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-ethereal-violet/30 rounded-full flex items-center justify-center">
                        {getFortuneIcon(session.fortuneType)}
                      </div>
                      <div>
                        <h3 className="font-semibold font-mystical text-moonlight text-lg">
                          {session.title}
                        </h3>
                        <p className="text-star-silver">
                          {getFortuneTypeText(session.fortuneType)}
                        </p>
                        <p className="text-sm text-star-silver/60">
                          {new Date(session.createdAt!).toLocaleDateString('ko-KR')} · {' '}
                          {new Date(session.createdAt!).toLocaleTimeString('ko-KR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.isCompleted ? (
                        <span className="text-mystical-gold text-sm font-medium">완료됨</span>
                      ) : (
                        <span className="text-star-silver text-sm">진행중</span>
                      )}
                      <ChevronRight className="h-5 w-5 text-mystical-gold" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-star-silver relative z-10">
                <div className="w-20 h-20 bg-ethereal-violet/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-10 w-10 text-mystical-gold" />
                </div>
                <h3 className="text-xl font-mystical text-moonlight mb-2">
                  {storybookData?.story ? "최근 새로운 이야기가 없습니다" : "아직 이야기 기록이 없습니다"}
                </h3>
                <p className="text-star-silver/80 mb-6">
                  {storybookData?.story ? "새로운 대화를 시작해보세요" : "편안한 대화를 시작해보세요!"}
                </p>
                <Button
                  className="bg-gradient-to-r from-mystical-purple to-ethereal-violet hover:from-mystical-purple/90 hover:to-ethereal-violet/90 glow-purple"
                  onClick={() => setLocation("/")}
                >
                  이야기 시작하기
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
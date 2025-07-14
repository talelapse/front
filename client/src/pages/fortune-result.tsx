import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Bookmark, Share2, Star, Heart, DollarSign, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { FortuneSession, FortuneResult } from "@shared/schema";

interface ResultData {
  session: FortuneSession;
  messages: any[];
  result: FortuneResult;
}

export default function FortuneResultPage() {
  const { sessionId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: resultData, isLoading } = useQuery<ResultData>({
    queryKey: ["/api/fortune/sessions", sessionId],
    enabled: !!sessionId,
    retry: false,
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "FateChat 운세 결과",
        text: `FateChat에서 받은 나의 운세 결과를 확인해보세요!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크 복사 완료",
        description: "운세 결과 링크가 클립보드에 복사되었습니다.",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "저장 완료",
      description: "운세 결과가 히스토리에 저장되었습니다.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mystical-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!resultData || !resultData.result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">운세 결과를 찾을 수 없습니다.</p>
            <Button 
              className="mt-4" 
              onClick={() => setLocation("/")}
            >
              홈으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { session, result } = resultData;
  const analysis = result.analysis;

  const getFortuneTypeTitle = (fortuneType: string) => {
    switch (fortuneType) {
      case 'saju':
        return "사주팔자";
      case 'tarot':
        return "타로";
      case 'astrology':
        return "점성술";
      default:
        return "운세";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-mystical-purple text-white p-4 flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-white/20 text-white"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h3 className="font-semibold">{getFortuneTypeTitle(session.fortuneType)} 결과</h3>
          <p className="text-sm text-purple-200">
            {new Date(session.createdAt!).toLocaleDateString('ko-KR')}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-purple-600 to-mystical-purple text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2">오늘의 운세</h2>
            <p className="text-purple-100 mb-4">
              {analysis.personality || "전반적으로 좋은 하루가 될 것 같습니다."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{result.overallScore || 0}</div>
                <div className="text-sm text-purple-200 flex items-center justify-center">
                  <Star className="h-4 w-4 mr-1" />
                  종합운
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{result.loveScore || 0}</div>
                <div className="text-sm text-purple-200 flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-1" />
                  연애운
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{result.wealthScore || 0}</div>
                <div className="text-sm text-purple-200 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  재물운
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{result.healthScore || 0}</div>
                <div className="text-sm text-purple-200 flex items-center justify-center">
                  <Shield className="h-4 w-4 mr-1" />
                  건강운
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {getFortuneTypeTitle(session.fortuneType)} 상세 분석
            </h3>
            
            {/* Five Elements Chart for Saju */}
            {session.fortuneType === 'saju' && analysis.fiveElements && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">오행 분석</h4>
                <div className="grid grid-cols-5 gap-2">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">목</span>
                    </div>
                    <div className="text-xs text-gray-600">{analysis.fiveElements.wood}%</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-red-600 font-bold">화</span>
                    </div>
                    <div className="text-xs text-gray-600">{analysis.fiveElements.fire}%</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-yellow-600 font-bold">토</span>
                    </div>
                    <div className="text-xs text-gray-600">{analysis.fiveElements.earth}%</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-gray-600 font-bold">금</span>
                    </div>
                    <div className="text-xs text-gray-600">{analysis.fiveElements.metal}%</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">수</span>
                    </div>
                    <div className="text-xs text-gray-600">{analysis.fiveElements.water}%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Saju Pillars */}
            {session.fortuneType === 'saju' && analysis.sajuPillars && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">사주팔자</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">년주</div>
                    <div className="font-bold text-mystical-purple">{analysis.sajuPillars.year}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">월주</div>
                    <div className="font-bold text-mystical-purple">{analysis.sajuPillars.month}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">일주</div>
                    <div className="font-bold text-mystical-purple">{analysis.sajuPillars.day}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">시주</div>
                    <div className="font-bold text-mystical-purple">{analysis.sajuPillars.hour}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tarot Cards */}
            {session.fortuneType === 'tarot' && analysis.tarotCards && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">뽑은 카드</h4>
                <div className="flex space-x-3 overflow-x-auto">
                  {analysis.tarotCards.map((card: string, index: number) => (
                    <div key={index} className="bg-mystical-gold/10 p-4 rounded-lg text-center min-w-[120px]">
                      <div className="text-4xl mb-2">🎴</div>
                      <div className="text-sm font-medium">{card}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Sections */}
            <div className="space-y-4">
              {analysis.personality && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-semibold text-mystical-purple mb-2">성격 분석</h5>
                  <p className="text-gray-700 text-sm">{analysis.personality}</p>
                </div>
              )}
              
              {analysis.loveLife && (
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h5 className="font-semibold text-pink-600 mb-2">연애운</h5>
                  <p className="text-gray-700 text-sm">{analysis.loveLife}</p>
                </div>
              )}
              
              {analysis.wealth && (
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h5 className="font-semibold text-mystical-gold mb-2">재물운</h5>
                  <p className="text-gray-700 text-sm">{analysis.wealth}</p>
                </div>
              )}

              {analysis.health && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-semibold text-green-600 mb-2">건강운</h5>
                  <p className="text-gray-700 text-sm">{analysis.health}</p>
                </div>
              )}
            </div>

            {/* Recommendations */}
            {result.recommendations && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-600 mb-2">조언 및 추천</h5>
                <p className="text-gray-700 text-sm whitespace-pre-line">{result.recommendations}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={handleSave}
            className="flex-1 bg-mystical-purple hover:bg-purple-700"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            저장하기
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 bg-mystical-gold hover:bg-yellow-500"
          >
            <Share2 className="h-4 w-4 mr-2" />
            공유하기
          </Button>
        </div>
      </div>
    </div>
  );
}

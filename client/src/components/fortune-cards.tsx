import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Star, MessageCircle } from "lucide-react";

interface FortuneCardsProps {
  onSelectFortune: (fortuneType: string, title: string) => void;
  isLoading?: boolean;
}

export default function FortuneCards({ onSelectFortune, isLoading = false }: FortuneCardsProps) {
  const fortuneTypes = [
    {
      type: 'saju',
      title: '사주팔자 상담',
      description: '생년월일을 바탕으로 한 성격과 삶의 방향 이야기',
      subtitle: '四柱八字',
      icon: ArrowDown,
      gradient: 'from-mystical-purple to-ethereal-violet',
      glow: 'glow-purple',
    },
    {
      type: 'tarot',
      title: '타로 이야기',
      description: '카드와 함께하는 편안한 대화',
      subtitle: 'TAROT',
      icon: Sparkles,
      gradient: 'from-mystical-gold to-ancient-amber',
      glow: 'glow-gold',
    },
    {
      type: 'astrology',
      title: '별자리 이야기',
      description: '별자리와 행성으로 알아보는 나의 특성',
      subtitle: 'ASTROLOGY',
      icon: Star,
      gradient: 'from-cosmic-indigo to-ethereal-violet',
      glow: 'glow-purple',
    },
    {
      type: 'casual',
      title: '가벼운 대화',
      description: '일상의 고민과 궁금한 것들을 편하게 나눠보세요',
      subtitle: 'CASUAL TALK',
      icon: MessageCircle,
      gradient: 'from-emerald-500 to-teal-600',
      glow: 'glow-emerald',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fortuneTypes.map((fortune) => {
        const IconComponent = fortune.icon;
        return (
          <Card 
            key={fortune.type}
            className={`mystical-card group hover:${fortune.glow} transition-all duration-300 cursor-pointer border border-ethereal-violet/30 hover:border-mystical-purple/50`}
          >
            <CardContent className="p-6 text-center relative overflow-hidden">
              {/* Mystical background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${fortune.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              
              <div className="relative z-10">
                {/* Icon with mystical glow */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-ethereal-violet/20 group-hover:bg-ethereal-violet/30 transition-colors">
                  <IconComponent className="text-mystical-gold h-8 w-8 group-hover:glow-gold transition-all" />
                </div>
                
                {/* Title with mystical font */}
                <h3 className="text-lg font-bold font-mystical text-white mb-1 group-hover:text-mystical-gold transition-colors">{fortune.title}</h3>
                <p className="text-xs text-mystical-gold/80 mb-3 font-mystical">{fortune.subtitle}</p>
                <p className="text-gray-300 text-sm mb-4">{fortune.description}</p>
                
                {/* Mystical button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${fortune.gradient} hover:opacity-90 text-white font-medium border-0 shadow-lg`}
                  onClick={() => onSelectFortune(fortune.type, `${fortune.title} 상담`)}
                  disabled={isLoading}
                >
                  {isLoading ? '준비 중...' : '운명을 알아보기'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

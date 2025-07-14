import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Star } from "lucide-react";

interface FortuneCardsProps {
  onSelectFortune: (fortuneType: string, title: string) => void;
  isLoading?: boolean;
}

export default function FortuneCards({ onSelectFortune, isLoading = false }: FortuneCardsProps) {
  const fortuneTypes = [
    {
      type: 'saju',
      title: '사주팔자',
      description: '생년월일을 바탕으로 한 정통 사주 풀이',
      icon: ArrowDown,
      color: 'mystical-purple',
      bgColor: 'purple-100',
      hoverBgColor: 'purple-200',
    },
    {
      type: 'tarot',
      title: '타로',
      description: '카드가 전하는 신비로운 메시지',
      icon: Sparkles,
      color: 'mystical-gold',
      bgColor: 'amber-100',
      hoverBgColor: 'amber-200',
    },
    {
      type: 'astrology',
      title: '점성술',
      description: '별자리와 행성으로 보는 운세',
      icon: Star,
      color: 'indigo-600',
      bgColor: 'indigo-100',
      hoverBgColor: 'indigo-200',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {fortuneTypes.map((fortune) => {
        const IconComponent = fortune.icon;
        return (
          <Card 
            key={fortune.type}
            className="group hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 bg-${fortune.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${fortune.hoverBgColor} transition-colors`}>
                <IconComponent className={`text-${fortune.color} h-8 w-8`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{fortune.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{fortune.description}</p>
              <Button 
                className={`w-full ${
                  fortune.type === 'saju' ? 'bg-mystical-purple hover:bg-purple-700' :
                  fortune.type === 'tarot' ? 'bg-mystical-gold hover:bg-yellow-500' :
                  'bg-indigo-600 hover:bg-indigo-700'
                }`}
                onClick={() => onSelectFortune(fortune.type, `${fortune.title} 상담`)}
                disabled={isLoading}
              >
                시작하기
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

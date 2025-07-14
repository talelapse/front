import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sparkles, Star, Heart } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy via-purple-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Moon className="text-mystical-gold h-8 w-8" />
              <span className="text-white text-xl font-bold">FateChat</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">서비스 소개</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">운세 종류</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">이용 후기</a>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="ghost" 
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={handleLogin}
              >
                로그인
              </Button>
              <Button 
                className="bg-mystical-gold text-black hover:bg-yellow-500 hover:text-black font-semibold"
                onClick={handleLogin}
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI가 풀어주는<br />
              <span className="text-mystical-gold">나만의 운세</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              생년월일부터 출생 시각까지, 당신의 정보를 바탕으로 
              사주·타로·점성술의 신비로운 세계를 경험해보세요
            </p>
          </div>
          
          {/* Hero Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* 사주 Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 animate-float">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-white font-semibold text-lg mb-2">사주팔자</h3>
                <p className="text-white/70 text-sm">오행과 음양의 조화로 당신의 운명을 읽어드립니다</p>
              </CardContent>
            </Card>
            
            {/* 타로 Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 animate-float" style={{animationDelay: '1s'}}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎴</div>
                <h3 className="text-white font-semibold text-lg mb-2">타로</h3>
                <p className="text-white/70 text-sm">신비로운 타로 카드가 전하는 메시지를 확인하세요</p>
              </CardContent>
            </Card>
            
            {/* 점성술 Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 animate-float" style={{animationDelay: '2s'}}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-white font-semibold text-lg mb-2">점성술</h3>
                <p className="text-white/70 text-sm">별자리와 행성의 위치로 운세를 알아보세요</p>
              </CardContent>
            </Card>
          </div>
          
          <Button 
            size="lg"
            className="bg-mystical-gold text-black px-8 py-4 text-lg font-semibold hover:bg-yellow-500 hover:text-black animate-glow"
            onClick={handleLogin}
          >
            지금 무료로 시작하기
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            FateChat만의 특별함
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-mystical-purple rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">AI 기반 정확한 해석</h3>
                <p className="text-white/70">최신 AI 기술과 전통 점술의 만남으로 더욱 정확하고 개인화된 운세를 제공합니다.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-mystical-gold rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">대화형 상담</h3>
                <p className="text-white/70">궁금한 점을 자유롭게 물어보고 실시간으로 답변을 받아보세요.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">다양한 운세 분야</h3>
                <p className="text-white/70">사주, 타로, 점성술 등 다양한 분야의 운세를 한 곳에서 만나보세요.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Moon className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">히스토리 관리</h3>
                <p className="text-white/70">과거의 운세 결과를 저장하고 언제든지 다시 확인할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

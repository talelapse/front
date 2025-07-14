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
              <span className="text-white text-xl font-bold">TaleLapse</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-white/80 hover:text-white transition-colors">서비스 소개</a>
              <a href="#services" className="text-white/80 hover:text-white transition-colors">운세 종류</a>
              <a href="#reviews" className="text-white/80 hover:text-white transition-colors">이용 후기</a>
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
              당신을 위한<br />
              <span className="text-mystical-gold">특별한 운세</span>
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
            지금 시작하기
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            TaleLapse만의 특별함
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-mystical-purple rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-white h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">정확한 해석</h3>
                <p className="text-white/70">현대 기술과 전통 점술의 만남으로 더욱 정확하고 개인화된 운세를 제공합니다.</p>
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

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">서비스 소개</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              TaleLapse는 전통 운세와 현대 기술의 만남으로, 개인화된 운세 상담을 제공하는 새로운 플랫폼입니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">나만을 위한 특별한 이야기</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mystical-gold rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80">생년월일, 출생시간 등 개인 정보를 바탕으로 한 정확한 운세 분석</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mystical-gold rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80">AI와의 자연스러운 대화를 통한 편안한 상담 경험</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mystical-gold rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80">과거 상담 기록을 아름다운 이야기로 저장하여 언제든 다시 확인</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mystical-gold rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80">운세뿐만 아니라 일상 고민도 함께 나눌 수 있는 친근한 공간</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-6xl mb-4">✨</div>
                <h4 className="text-xl font-semibold text-white mb-4">언제나 함께하는 운세 친구</h4>
                <p className="text-white/70">
                  복잡하고 어려운 운세 용어 대신, 친구와 대화하듯 편안하게 운세를 알아보세요. 
                  당신의 이야기를 들어주고 따뜻한 조언을 건네는 특별한 경험을 만나보세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">운세 종류</h2>
            <p className="text-xl text-white/80">
              다양한 방식으로 당신의 운세와 미래를 알아보세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 이야기 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-white font-semibold text-xl mb-3">이야기</h3>
                <p className="text-white/70 text-sm mb-4">
                  일상의 고민이나 궁금한 점을 편안하게 대화하며 
                  따뜻한 조언을 받아보세요
                </p>
                <div className="space-y-2 text-xs text-white/60">
                  <div>• 일상 고민 상담</div>
                  <div>• 선택의 순간 조언</div>
                  <div>• 마음의 위로</div>
                </div>
              </CardContent>
            </Card>
            
            {/* 사주 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">🔮</div>
                <h3 className="text-white font-semibold text-xl mb-3">사주팔자</h3>
                <p className="text-white/70 text-sm mb-4">
                  출생 정보를 바탕으로 한 전통 사주 해석과 
                  오행의 균형을 통한 운세 분석
                </p>
                <div className="space-y-2 text-xs text-white/60">
                  <div>• 오행 균형 분석</div>
                  <div>• 사주 기둥 해석</div>
                  <div>• 연애·직업·건강 운세</div>
                </div>
              </CardContent>
            </Card>
            
            {/* 타로 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">🎴</div>
                <h3 className="text-white font-semibold text-xl mb-3">타로</h3>
                <p className="text-white/70 text-sm mb-4">
                  신비로운 타로 카드를 통해 현재 상황과 
                  미래의 가능성을 살펴보세요
                </p>
                <div className="space-y-2 text-xs text-white/60">
                  <div>• 현재 상황 분석</div>
                  <div>• 미래 가능성 탐색</div>
                  <div>• 카드별 의미 해석</div>
                </div>
              </CardContent>
            </Card>
            
            {/* 점성술 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="text-white font-semibold text-xl mb-3">점성술</h3>
                <p className="text-white/70 text-sm mb-4">
                  별자리와 행성의 움직임을 통해 
                  당신의 성격과 운세를 알아보세요
                </p>
                <div className="space-y-2 text-xs text-white/60">
                  <div>• 별자리 특성 분석</div>
                  <div>• 행성 에너지 해석</div>
                  <div>• 우주적 흐름 파악</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-white/70 mb-6">
              모든 운세는 AI와의 대화를 통해 진행되며, 궁금한 점을 자유롭게 물어볼 수 있습니다
            </p>
            <Button 
              size="lg"
              className="bg-mystical-gold text-black px-8 py-3 font-semibold hover:bg-yellow-500 hover:text-black"
              onClick={handleLogin}
            >
              운세 보러 가기
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">이용 후기</h2>
            <p className="text-xl text-white/80">
              TaleLapse를 이용한 분들의 생생한 경험담을 들어보세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 후기 1 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-mystical-purple rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">김</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">김○○</div>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  "처음에는 AI 운세가 어색했는데, 대화하다 보니 정말 친구와 이야기하는 것 같았어요. 
                  특히 사주 해석이 너무 정확해서 깜짝 놀랐습니다. 앞으로도 자주 이용할 것 같아요!"
                </p>
                <div className="mt-4 text-xs text-white/60">
                  사주팔자 · 2주 전
                </div>
              </CardContent>
            </Card>
            
            {/* 후기 2 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-mystical-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-semibold">이</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">이○○</div>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  "타로 상담을 받았는데 카드별 의미를 자세히 설명해주셔서 좋았어요. 
                  무엇보다 따뜻하고 위로가 되는 말씀들이 마음에 큰 힘이 되었습니다. 
                  히스토리 기능도 너무 좋아요!"
                </p>
                <div className="mt-4 text-xs text-white/60">
                  타로 · 1주 전
                </div>
              </CardContent>
            </Card>
            
            {/* 후기 3 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">박</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">박○○</div>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  "일상 고민 상담받기 위해 '이야기' 기능을 사용했는데, 
                  운세 말고도 그냥 대화 상대가 필요할 때 정말 좋더라고요. 
                  24시간 언제든 편안하게 이야기할 수 있어서 만족해요."
                </p>
                <div className="mt-4 text-xs text-white/60">
                  이야기 · 3일 전
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 inline-block">
              <div className="flex items-center justify-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-mystical-gold">4.9</div>
                  <div className="text-yellow-400">★★★★★</div>
                  <div className="text-white/60 text-sm">평균 평점</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1,200+</div>
                  <div className="text-white/60 text-sm">이용 후기</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mystical-gold">95%</div>
                  <div className="text-white/60 text-sm">재이용률</div>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                많은 분들이 TaleLapse와 함께 특별한 경험을 하고 계십니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-deep-navy to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            당신만의 특별한 이야기를 시작해보세요
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            지금 가입하고 AI와 함께하는 새로운 운세 경험을 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-mystical-gold text-black px-8 py-4 text-lg font-semibold hover:bg-yellow-500 hover:text-black"
              onClick={handleLogin}
            >
              무료로 시작하기
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              더 알아보기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

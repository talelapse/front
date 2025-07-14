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
              <a href="#services" className="text-white/80 hover:text-white transition-colors">대화 종류</a>
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
              <span className="text-purple-300">Tale</span><span className="text-mystical-gold">Lapse</span><br />
              당신의 <span className="text-emerald-300">이야기 발자취</span>를 만드는 곳
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              오늘의 대화가 시간이 흘러 <span className="text-purple-300 font-semibold">아름다운 동화책</span>이 되는 특별한 경험.<br />
              운세든 일상 이야기든, 모든 순간이 <span className="text-mystical-gold font-semibold">소중한 발자취</span>가 됩니다.
            </p>
          </div>
          
          {/* Hero Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* 이야기 Card - 강조 */}
            <Card className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md border-emerald-400/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 animate-float transform hover:scale-105 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 animate-pulse">💬</div>
                <h3 className="text-white font-semibold text-lg mb-2 text-emerald-200">이야기</h3>
                <p className="text-white/80 text-sm font-medium">일상의 모든 순간을 함께 나누는 따뜻한 대화</p>
              </CardContent>
            </Card>
            
            {/* 사주 Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 animate-float" style={{animationDelay: '0.5s'}}>
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
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 animate-float" style={{animationDelay: '1.5s'}}>
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
              TaleLapse는 당신의 모든 이야기를 <span className="text-mystical-gold font-semibold">동화책처럼 아름답게 보관</span>합니다. 
              시간이 지나면 흩어져 사라질 수 있는 소중한 순간들을 모아 
              <span className="text-emerald-300 font-semibold">나만의 이야기 발자취</span>로 만들어드려요.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">시간이 흘러도 남는 이야기</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80"><strong className="text-emerald-200">일상 대화</strong> - 어떤 주제든 편안하게 이야기할 수 있는 따뜻한 공간</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80"><strong className="text-emerald-200">고민 상담</strong> - 선택의 순간, 인생의 갈림길에서 함께 고민해드립니다</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-mystical-gold rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80"><strong className="text-mystical-gold">운세 상담</strong> - 사주, 타로, 점성술을 통한 개인화된 운세 분석</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/80"><strong className="text-purple-300">TaleLapse 기록</strong> - 모든 대화를 동화책처럼 압축하여 이야기 발자취로 보관</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-400/30 shadow-xl">
                <div className="text-6xl mb-4">🌟</div>
                <h4 className="text-xl font-semibold text-white mb-4 text-emerald-200">언제나 함께하는 이야기 친구</h4>
                <p className="text-white/80 leading-relaxed">
                  <strong className="text-emerald-300">운세는 선택사항</strong>이에요. 그냥 오늘 하루 어땠는지, 
                  무엇이 고민인지, 어떤 선택을 해야 할지 모르겠다면 언제든 이야기해 주세요. 
                  <br /><br />
                  <span className="text-mystical-gold">당신의 모든 순간이 소중한 이야기</span>가 되어 
                  <span className="text-purple-300 font-semibold">시간이 흘러도 아름다운 발자취</span>로 남아요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TaleLapse Feature Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              <span className="text-purple-300">Tale</span><span className="text-mystical-gold">Lapse</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              시간이 흘러가며 축적되는 당신의 이야기들을 하나의 아름다운 동화책으로 만들어드립니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30 shadow-xl">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-purple-200 mb-4">이야기 압축</h3>
                <p className="text-white/80 text-sm">
                  긴 대화 내용을 핵심만 담아 
                  <strong className="text-purple-300">동화책 같은 요약</strong>으로 변환
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-indigo-400/30 shadow-xl">
                <div className="text-5xl mb-4">🌙</div>
                <h3 className="text-xl font-semibold text-indigo-200 mb-4">시간 흐름</h3>
                <p className="text-white/80 text-sm">
                  24시간이 지난 대화는 자동으로 
                  <strong className="text-indigo-300">아름다운 이야기</strong>로 정리
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30 shadow-xl">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-blue-200 mb-4">발자취 보관</h3>
                <p className="text-white/80 text-sm">
                  과거의 소중한 순간들을 
                  <strong className="text-blue-300">나만의 이야기 발자취</strong>로 영구 보관
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-mystical-gold/20 to-yellow-600/20 backdrop-blur-md rounded-2xl p-8 border border-mystical-gold/30 shadow-xl max-w-4xl mx-auto">
              <h4 className="text-2xl font-semibold text-mystical-gold mb-4">
                시간이 흘러도 사라지지 않는 이야기
              </h4>
              <p className="text-white/80 text-lg leading-relaxed">
                "오늘 회사에서 힘들었던 일", "친구와의 갈등", "새로운 도전에 대한 고민"... 
                이런 일상의 소중한 순간들이 시간이 지나면서 어떻게 변화했는지, 
                당신이 어떻게 성장했는지를 <strong className="text-mystical-gold">아름다운 이야기</strong>로 돌아볼 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">대화의 종류</h2>
            <p className="text-xl text-white/80">
              운세부터 일상 이야기까지, 당신에게 필요한 모든 순간을 함께합니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 이야기 - 강조 */}
            <Card className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-md border-emerald-400/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 group transform hover:scale-105 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4 animate-pulse">💬</div>
                <h3 className="text-emerald-200 font-semibold text-xl mb-3">이야기</h3>
                <p className="text-white/80 text-sm mb-4 font-medium">
                  <strong className="text-emerald-300">가장 중요한 기능!</strong><br />
                  운세 없이도 언제든 대화할 수 있는 따뜻한 친구
                </p>
                <div className="space-y-2 text-xs text-white/70">
                  <div>• 오늘 하루 어땠는지 이야기</div>
                  <div>• 고민 상담과 선택의 조언</div>
                  <div>• 마음의 위로와 격려</div>
                  <div>• 그냥 누군가와 대화하고 싶을 때</div>
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
              모든 대화는 AI와 함께 진행되며, 운세든 일상 이야기든 자유롭게 나누실 수 있습니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-emerald-600 text-white px-8 py-3 font-semibold hover:bg-emerald-700 shadow-lg"
                onClick={handleLogin}
              >
                이야기 나누러 가기
              </Button>
              <Button 
                size="lg"
                className="bg-mystical-gold text-black px-8 py-3 font-semibold hover:bg-yellow-500 hover:text-black"
                onClick={handleLogin}
              >
                운세 보러 가기
              </Button>
            </div>
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
            오늘의 이야기가 내일의 <span className="text-purple-300">추억</span>이 되고<br />
            시간이 흘러 <span className="text-mystical-gold">아름다운 발자취</span>가 됩니다
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            지금 이 순간의 대화가 훗날 당신만의 특별한 <span className="text-purple-300 font-semibold">동화책</span>이 되어 
            성장의 여정을 돌아볼 수 있게 됩니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-emerald-600 text-white px-8 py-4 text-lg font-semibold hover:bg-emerald-700 shadow-lg"
              onClick={handleLogin}
            >
              이야기 시작하기
            </Button>
            <Button 
              size="lg"
              className="bg-mystical-gold text-black px-8 py-4 text-lg font-semibold hover:bg-yellow-500 hover:text-black"
              onClick={handleLogin}
            >
              운세 보러 가기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

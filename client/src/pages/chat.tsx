import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Mic, ArrowDown, Sparkles, Star, User, Bookmark, Share } from "lucide-react";
import ChatMessage from "@/components/chat-message";
import TypingIndicator from "@/components/ui/typing-indicator";
import type { FortuneSession, FortuneMessage } from "@shared/schema";

interface ChatData {
  session: FortuneSession;
  messages: FortuneMessage[];
  result: any;
}

export default function Chat() {
  const { sessionId } = useParams();
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: chatData, isLoading } = useQuery<ChatData>({
    queryKey: ["/api/fortune/sessions", sessionId],
    enabled: !!sessionId,
    retry: false,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const response = await apiRequest("POST", `/api/fortune/sessions/${sessionId}/messages`, {
        message: messageText,
      });
      return response.json();
    },
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fortune/sessions", sessionId] });
      setMessage("");
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
        title: "메시지 전송 실패",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsTyping(false);
    },
  });

  const completeSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/fortune/sessions/${sessionId}/complete`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fortune/sessions", sessionId] });
      setLocation(`/result/${sessionId}`);
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
        description: "세션 완료에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData?.messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(message);
  };

  const handleQuickMessage = (quickMessage: string) => {
    if (sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(quickMessage);
  };

  const handleCompleteSession = () => {
    completeSessionMutation.mutate();
  };

  const getFortuneIcon = (fortuneType: string) => {
    switch (fortuneType) {
      case 'saju':
        return <ArrowDown className="h-5 w-5" />;
      case 'tarot':
        return <Sparkles className="h-5 w-5" />;
      case 'astrology':
        return <Star className="h-5 w-5" />;
      default:
        return <WindArrowDown className="h-5 w-5" />;
    }
  };

  const getFortuneTitle = (fortuneType: string) => {
    switch (fortuneType) {
      case 'saju':
        return "사주 마스터";
      case 'tarot':
        return "타로 마스터";
      case 'astrology':
        return "점성술 마스터";
      default:
        return "운세 마스터";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mystical-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">채팅을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!chatData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">채팅을 찾을 수 없습니다.</p>
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

  const { session, messages } = chatData;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Chat Header */}
      <div className="mystical-card p-4 flex items-center space-x-3 shadow-lg border-b border-ethereal-violet/30">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-ethereal-violet/20 text-moonlight"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-ethereal-violet/30 rounded-full flex items-center justify-center">
            {getFortuneIcon(session.fortuneType)}
          </div>
          <div>
            <h3 className="font-semibold font-mystical text-moonlight">{getFortuneTitle(session.fortuneType)}</h3>
            <p className="text-sm text-star-silver">신비로운 대화 중...</p>
          </div>
        </div>
        <div className="flex-1" />
        {messages.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-moonlight hover:bg-ethereal-violet/20 border border-mystical-gold/30"
            onClick={handleCompleteSession}
            disabled={completeSessionMutation.isPending}
          >
            상담 완료
          </Button>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-deep-navy/50 to-shadow-purple/30">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} fortuneType={session.fortuneType} />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-t-2 border-mystical-purple/30 p-4 shadow-lg">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="신비로운 메시지를 입력하세요..."
              className="pr-12 bg-gray-800 text-white placeholder:text-gray-300 rounded-2xl border-2 border-mystical-purple/70 focus:ring-4 focus:ring-mystical-gold/50 focus:bg-gray-700 focus:border-mystical-gold focus:outline-none shadow-lg h-12"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-star-silver hover:text-mystical-gold p-1"
              disabled={sendMessageMutation.isPending}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-mystical-purple to-ethereal-violet hover:from-mystical-purple/90 hover:to-ethereal-violet/90 p-3 rounded-full glow-purple"
            disabled={!message.trim() || sendMessageMutation.isPending}
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </form>

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-3 overflow-x-auto">
          {session.fortuneType === 'saju' && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-mystical-purple border-mystical-purple/50 hover:border-mystical-purple"
                onClick={() => handleQuickMessage("연애에 대해 이야기해볼까요?")}
                disabled={sendMessageMutation.isPending}
              >
                연애 이야기
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-mystical-purple border-mystical-purple/50 hover:border-mystical-purple"
                onClick={() => handleQuickMessage("돈과 직업에 대해 이야기해볼까요?")}
                disabled={sendMessageMutation.isPending}
              >
                재물 이야기
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-mystical-purple border-mystical-purple/50 hover:border-mystical-purple"
                onClick={() => handleQuickMessage("건강에 대해 이야기해볼까요?")}
                disabled={sendMessageMutation.isPending}
              >
                건강 이야기
              </Button>
            </>
          )}
          {session.fortuneType === 'tarot' && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-mystical-purple border-mystical-purple/50 hover:border-mystical-purple"
                onClick={() => handleQuickMessage("카드와 함께 이야기해볼까요?")}
                disabled={sendMessageMutation.isPending}
              >
                카드 이야기
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-mystical-purple border-mystical-purple/50 hover:border-mystical-purple"
                onClick={() => handleQuickMessage("요즘 고민이 있어서 조언을 듣고 싶어요")}
                disabled={sendMessageMutation.isPending}
              >
                고민 상담
              </Button>
            </>
          )}
          {session.fortuneType === 'astrology' && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-mystical-purple border-mystical-purple/50 hover:border-mystical-purple"
                onClick={() => handleQuickMessage("제 별자리 특성에 대해 이야기해주세요")}
                disabled={sendMessageMutation.isPending}
              >
                별자리 특성
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-mystical-purple border-mystical-purple/50 hover:border-mystical-purple"
                onClick={() => handleQuickMessage("요즘 어떤 에너지를 받고 있을까요?")}
                disabled={sendMessageMutation.isPending}
              >
                현재 에너지
              </Button>
            </>
          )}
          {session.fortuneType === 'casual' && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-emerald-600 border-emerald-500/50 hover:border-emerald-500"
                onClick={() => handleQuickMessage("요즘 고민이 있는데 들어줄 수 있나요?")}
                disabled={sendMessageMutation.isPending}
              >
                고민 상담
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-emerald-600 border-emerald-500/50 hover:border-emerald-500"
                onClick={() => handleQuickMessage("어떤 선택을 해야 할지 모르겠어요")}
                disabled={sendMessageMutation.isPending}
              >
                선택의 고민
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="whitespace-nowrap rounded-full text-sm bg-gray-700 text-white hover:bg-emerald-600 border-emerald-500/50 hover:border-emerald-500"
                onClick={() => handleQuickMessage("가벼운 일상 이야기를 나누고 싶어요")}
                disabled={sendMessageMutation.isPending}
              >
                일상 이야기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

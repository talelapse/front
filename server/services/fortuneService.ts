import { storage } from "../storage";
import { generateFortuneResponse, generateDetailedFortuneAnalysis } from "./openai";
import type { 
  InsertFortuneSession, 
  InsertFortuneMessage, 
  InsertFortuneResult,
  FortuneSession,
  FortuneMessage 
} from "@shared/schema";

export class FortuneService {
  async startFortuneSession(
    userId: string, 
    fortuneType: string, 
    title: string
  ): Promise<FortuneSession> {
    const sessionData: InsertFortuneSession = {
      userId,
      fortuneType,
      title,
      isCompleted: false,
    };

    const session = await storage.createFortuneSession(sessionData);

    // Create initial bot message
    const initialMessage = this.getInitialMessage(fortuneType);
    await storage.createFortuneMessage({
      sessionId: session.id,
      role: "assistant",
      content: initialMessage,
      metadata: {},
    });

    return session;
  }

  async sendMessage(
    sessionId: number,
    userMessage: string,
    userId: string
  ): Promise<FortuneMessage> {
    // Save user message
    await storage.createFortuneMessage({
      sessionId,
      role: "user",
      content: userMessage,
      metadata: {},
    });

    // Get session and user profile
    const session = await storage.getFortuneSession(sessionId);
    if (!session) {
      throw new Error("세션을 찾을 수 없습니다.");
    }

    // Mark session as having user message if this is the first user message
    if (!session.hasUserMessage) {
      await storage.updateFortuneSession(sessionId, {
        hasUserMessage: true,
      });
    }

    const userProfile = await storage.getUserProfile(userId);
    if (!userProfile) {
      throw new Error("사용자 프로필을 찾을 수 없습니다.");
    }

    // Get conversation history
    const messages = await storage.getSessionMessages(sessionId);
    const conversationHistory = messages
      .filter(m => m.role !== "assistant" || m.content !== this.getInitialMessage(session.fortuneType))
      .map(m => ({
        role: m.role,
        content: m.content,
      }));

    // Generate AI response
    const botResponse = await generateFortuneResponse(
      session.fortuneType,
      userMessage,
      userProfile,
      conversationHistory
    );

    // Save bot response
    const botMessage = await storage.createFortuneMessage({
      sessionId,
      role: "assistant",
      content: botResponse,
      metadata: {},
    });

    return botMessage;
  }

  async completeSession(sessionId: number): Promise<void> {
    const session = await storage.getFortuneSession(sessionId);
    if (!session) {
      throw new Error("세션을 찾을 수 없습니다.");
    }

    const userProfile = await storage.getUserProfile(session.userId);
    if (!userProfile) {
      throw new Error("사용자 프로필을 찾을 수 없습니다.");
    }

    // Get all messages for summary
    const messages = await storage.getSessionMessages(sessionId);
    const conversationSummary = messages
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    // For casual conversations, just mark as completed without formal analysis
    if (session.fortuneType === 'casual') {
      await storage.updateFortuneSession(sessionId, {
        isCompleted: true,
        summary: "이야기 - 좋은 시간이었어요",
      });
      return;
    }

    // Generate detailed analysis for fortune sessions
    const analysis = await generateDetailedFortuneAnalysis(
      session.fortuneType,
      userProfile,
      conversationSummary
    );

    // Save fortune result
    const resultData: InsertFortuneResult = {
      sessionId,
      fortuneType: session.fortuneType,
      overallScore: analysis.overallScore,
      loveScore: analysis.loveScore,
      wealthScore: analysis.wealthScore,
      healthScore: analysis.healthScore,
      analysis,
      recommendations: analysis.recommendations?.join('\n'),
    };

    await storage.createFortuneResult(resultData);

    const sessionTypeText = session.fortuneType === 'saju' ? '사주 이야기' :
                           session.fortuneType === 'tarot' ? '타로 이야기' :
                           '별자리 이야기';

    // Mark session as completed
    await storage.updateFortuneSession(sessionId, {
      isCompleted: true,
      summary: `${sessionTypeText} - 종합 ${analysis.overallScore}점`,
    });
  }

  private getInitialMessage(fortuneType: string): string {
    switch (fortuneType) {
      case 'saju':
        return "안녕하세요! 사주 상담사입니다. 생년월일을 바탕으로 성격과 삶의 방향에 대해 편안하게 이야기해보세요. 어떤 것이 궁금하신가요?";
      case 'tarot':
        return "안녕하세요! 타로와 함께 편안한 대화를 나눠보세요. 일상의 고민이나 궁금한 것들을 자유롭게 말씀해 주세요.";
      case 'astrology':
        return "안녕하세요! 별자리 이야기를 함께 나눠보아요. 당신의 특성이나 궁금한 점들을 편하게 말씀해 주세요.";
      case 'casual':
        return "안녕하세요! 편안하게 이야기를 나눠보아요. 일상의 고민, 궁금한 점, 무엇이든 자유롭게 말씀해 주세요.";
      default:
        return "안녕하세요! 편안한 대화를 나눠보세요. 어떤 이야기든 자유롭게 말씀해 주세요.";
    }
  }
}

export const fortuneService = new FortuneService();

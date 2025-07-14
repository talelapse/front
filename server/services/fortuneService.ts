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

    // Generate detailed analysis
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

    // Mark session as completed
    await storage.updateFortuneSession(sessionId, {
      isCompleted: true,
      summary: `${session.fortuneType} 상담 - 종합운 ${analysis.overallScore}점`,
    });
  }

  private getInitialMessage(fortuneType: string): string {
    switch (fortuneType) {
      case 'saju':
        return "안녕하세요! 사주 마스터입니다. 생년월일을 바탕으로 정통 사주팔자를 풀어드리겠습니다. 어떤 것이 가장 궁금하신가요?";
      case 'tarot':
        return "안녕하세요! 타로 마스터입니다. 신비로운 타로 카드가 전하는 메시지를 들려드리겠습니다. 어떤 주제로 카드를 뽑아볼까요?";
      case 'astrology':
        return "안녕하세요! 점성술 마스터입니다. 별자리와 행성의 위치를 바탕으로 운세를 풀어드리겠습니다. 무엇이 궁금하신지 말씀해 주세요.";
      default:
        return "안녕하세요! 운세 상담사입니다. 어떤 것이 궁금하신가요?";
    }
  }
}

export const fortuneService = new FortuneService();

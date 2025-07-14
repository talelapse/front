import { storage } from "./storage";
import type { InsertFortuneSession, InsertFortuneMessage, InsertFortuneResult } from "@shared/schema";

export async function createDemoData(userId: string) {
  console.log("Creating demo data for user:", userId);

  // Create older sessions (3+ days ago) for storybook
  const oldSessions = [
    {
      userId,
      fortuneType: "saju",
      title: "첫 번째 사주 이야기",
      summary: "새로운 시작과 희망에 대한 운세를 봤습니다. 금년에는 새로운 기회가 많이 올 것 같다는 좋은 소식을 들었어요.",
      isCompleted: true,
      hasUserMessage: true,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    {
      userId,
      fortuneType: "tarot",
      title: "사랑 운세 타로",
      summary: "연애 운에 대해 물어봤는데, 곧 좋은 인연이 찾아올 것 같다는 카드가 나왔어요. 마음을 열고 기다려보라고 하네요.",
      isCompleted: true,
      hasUserMessage: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      userId,
      fortuneType: "astrology",
      title: "별자리 운세 상담",
      summary: "이번 달 별자리 운세를 봤는데, 전반적으로 안정적이고 창의적인 에너지가 강하다고 하더라고요.",
      isCompleted: true,
      hasUserMessage: true,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    },
    {
      userId,
      fortuneType: "casual",
      title: "일상 대화",
      summary: "오늘 하루 어떻게 보냈는지, 앞으로의 계획에 대해 편안하게 이야기를 나눴어요.",
      isCompleted: true,
      hasUserMessage: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  ];

  // Create recent sessions (within 24 hours)
  const recentSessions = [
    {
      userId,
      fortuneType: "saju",
      title: "오늘의 사주 운세",
      summary: "오늘 하루 운세에 대해 물어봤습니다.",
      isCompleted: true,
      hasUserMessage: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      userId,
      fortuneType: "casual",
      title: "가벼운 대화",
      summary: "요즘 고민에 대해 편안하게 대화했어요.",
      isCompleted: true,
      hasUserMessage: true,
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      updatedAt: new Date(Date.now() - 30 * 60 * 1000)
    }
  ];

  try {
    // Create old sessions first
    for (const sessionData of oldSessions) {
      const session = await storage.createFortuneSession(sessionData);
      
      // Add some demo messages
      await storage.createFortuneMessage({
        sessionId: session.id,
        content: "안녕하세요! 오늘 운세를 봐주세요.",
        isFromUser: true,
        createdAt: sessionData.createdAt,
        updatedAt: sessionData.createdAt
      });

      await storage.createFortuneMessage({
        sessionId: session.id,
        content: sessionData.summary!,
        isFromUser: false,
        createdAt: new Date(sessionData.createdAt!.getTime() + 60000),
        updatedAt: new Date(sessionData.createdAt!.getTime() + 60000)
      });

      // Add a fortune result for completed sessions
      if (sessionData.fortuneType !== 'casual') {
        await storage.createFortuneResult({
          sessionId: session.id,
          overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
          loveScore: Math.floor(Math.random() * 30) + 70,
          wealthScore: Math.floor(Math.random() * 30) + 70,
          healthScore: Math.floor(Math.random() * 30) + 70,
          personality: "따뜻하고 창의적인 성격",
          loveLife: "좋은 인연이 기다리고 있어요",
          wealth: "안정적인 재정 운이 계속될 것 같아요",
          health: "건강 관리에 조금 더 신경쓰시면 좋겠어요",
          recommendations: ["새로운 도전을 해보세요", "주변 사람들과 더 많은 시간을 보내세요"],
          createdAt: new Date(sessionData.createdAt!.getTime() + 120000),
          updatedAt: new Date(sessionData.createdAt!.getTime() + 120000)
        });
      }
    }

    // Create recent sessions
    for (const sessionData of recentSessions) {
      const session = await storage.createFortuneSession(sessionData);
      
      // Add some demo messages
      await storage.createFortuneMessage({
        sessionId: session.id,
        content: "안녕하세요! 궁금한 게 있어서 왔어요.",
        isFromUser: true,
        createdAt: sessionData.createdAt,
        updatedAt: sessionData.createdAt
      });

      await storage.createFortuneMessage({
        sessionId: session.id,
        content: sessionData.summary!,
        isFromUser: false,
        createdAt: new Date(sessionData.createdAt!.getTime() + 60000),
        updatedAt: new Date(sessionData.createdAt!.getTime() + 60000)
      });
    }

    console.log("Demo data created successfully!");
    return { success: true, message: "데모 데이터가 성공적으로 생성되었습니다." };
  } catch (error) {
    console.error("Error creating demo data:", error);
    return { success: false, message: "데모 데이터 생성 중 오류가 발생했습니다." };
  }
}
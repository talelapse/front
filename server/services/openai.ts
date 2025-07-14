import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface FortuneAnalysis {
  overallScore: number;
  loveScore: number;
  wealthScore: number;
  healthScore: number;
  personality: string;
  loveLife: string;
  wealth: string;
  health: string;
  recommendations: string[];
  fiveElements?: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  sajuPillars?: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  tarotCards?: string[];
  zodiacSign?: string;
}

export async function generateFortuneResponse(
  fortuneType: string,
  userMessage: string,
  userProfile: any,
  conversationHistory: any[]
): Promise<string> {
  const systemPrompt = getSystemPrompt(fortuneType, userProfile);
  
  const messages = [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "죄송합니다. 응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("운세 생성 중 오류가 발생했습니다.");
  }
}

export async function generateDetailedFortuneAnalysis(
  fortuneType: string,
  userProfile: any,
  conversationSummary: string
): Promise<FortuneAnalysis> {
  const systemPrompt = getAnalysisSystemPrompt(fortuneType, userProfile);
  
  const userPrompt = `
대화 요약: ${conversationSummary}

위 대화를 바탕으로 상세한 운세 분석을 JSON 형태로 제공해주세요.
반드시 다음 형식을 따라주세요:
{
  "overallScore": 점수(1-100),
  "loveScore": 점수(1-100),
  "wealthScore": 점수(1-100),
  "healthScore": 점수(1-100),
  "personality": "성격 분석 내용",
  "loveLife": "연애운 분석 내용",
  "wealth": "재물운 분석 내용",
  "health": "건강운 분석 내용",
  "recommendations": ["조언1", "조언2", "조언3"],
  ${fortuneType === 'saju' ? `
  "fiveElements": {
    "wood": 백분율,
    "fire": 백분율,
    "earth": 백분율,
    "metal": 백분율,
    "water": 백분율
  },
  "sajuPillars": {
    "year": "년주",
    "month": "월주",
    "day": "일주",
    "hour": "시주"
  }` : ''}
  ${fortuneType === 'tarot' ? `"tarotCards": ["카드1", "카드2", "카드3"]` : ''}
  ${fortuneType === 'astrology' ? `"zodiacSign": "별자리명"` : ''}
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const analysis = JSON.parse(response.choices[0].message.content || "{}");
    return analysis as FortuneAnalysis;
  } catch (error) {
    console.error("OpenAI Analysis Error:", error);
    throw new Error("상세 분석 생성 중 오류가 발생했습니다.");
  }
}

function getSystemPrompt(fortuneType: string, userProfile: any): string {
  const baseInfo = `
사용자 정보:
- 생년월일: ${userProfile.birthDate}
- 출생시각: ${userProfile.birthTime || '정보 없음'}
- 출생지: ${userProfile.birthLocation}
- 성별: ${userProfile.gender === 'male' ? '남성' : '여성'}
`;

  switch (fortuneType) {
    case 'saju':
      return `당신은 친근한 사주 상담사입니다. 한국의 전통 사주팔자를 바탕으로 편안하고 이해하기 쉬운 이야기를 나눠주세요.
${baseInfo}

상담 시 다음을 고려하세요:
- 성격과 특성에 대한 따뜻한 해석
- 삶의 방향과 가능성에 대한 격려
- 어려운 용어보다는 일상적인 언어 사용
- 긍정적이고 희망적인 관점 제시

친구와 대화하듯 편안하고 따뜻한 톤으로 답변해주세요.`;

    case 'tarot':
      return `당신은 따뜻한 타로 상담사입니다. 타로 카드를 통해 편안한 대화와 통찰을 나눠주세요.
${baseInfo}

상담 시 다음을 고려하세요:
- 카드의 메시지를 일상적인 언어로 해석
- 질문자의 감정과 상황에 공감
- 희망과 가능성에 초점을 맞춘 해석
- 부담스럽지 않은 가벼운 조언

편안하고 격려하는 방식으로 메시지를 전달하세요.`;

    case 'astrology':
      return `당신은 친근한 별자리 상담사입니다. 별자리와 행성의 이야기를 통해 재미있고 의미 있는 대화를 나눠주세요.
${baseInfo}

상담 시 다음을 고려하세요:
- 별자리의 특성을 재미있게 설명
- 개인의 장점과 매력에 초점
- 어려운 점성술 용어보다는 쉬운 설명
- 일상에 도움이 되는 가벼운 조언

친구처럼 편안하고 재미있는 톤으로 대화해주세요.`;

    case 'casual':
      return `당신은 친근하고 지혜로운 대화 상대입니다. 일상의 고민과 궁금한 점들에 대해 편안하고 도움이 되는 조언을 해주세요.
${baseInfo}

대화 시 다음을 고려하세요:
- 공감하고 이해하는 자세
- 실용적이고 현실적인 조언
- 긍정적이고 격려하는 메시지
- 부담스럽지 않은 가벼운 톤

진정한 친구처럼 따뜻하고 솔직한 대화를 나눠주세요.`;

    default:
      return `당신은 따뜻하고 지혜로운 상담사입니다. 편안한 대화를 통해 도움이 되는 이야기를 나눠주세요.
${baseInfo}

상담 시 공감하고 격려하는 따뜻한 톤으로 답변하세요.`;
  }
}

function getAnalysisSystemPrompt(fortuneType: string, userProfile: any): string {
  return `당신은 ${fortuneType} 전문가로서 상세한 분석 보고서를 작성합니다. 
사용자 정보를 바탕으로 정확하고 구체적인 분석을 제공하며, 
모든 점수는 1-100 사이의 정수로, 모든 텍스트는 한국어로 작성해주세요.
반드시 유효한 JSON 형식으로 응답하세요.`;
}

export async function generateStorybookSummary(
  sessions: any[],
  userProfile: any
): Promise<string> {
  const systemPrompt = `당신은 창의적인 동화 작가입니다. 
사용자의 여러 대화 세션들을 하나의 아름다운 동화 이야기로 엮어서 요약해주세요.

동화는 다음과 같은 특징을 가져야 합니다:
- 따뜻하고 친근한 톤
- 마법적이고 신비로운 요소들을 자연스럽게 포함
- 사용자의 성장과 깨달음을 중심으로 한 스토리
- 3-4개 문단으로 구성된 짧은 이야기
- 동화책 같은 서술 방식

사용자 정보:
- 이름: ${userProfile?.firstName || '주인공'}
- 생년월일: ${userProfile?.birthDate || '알 수 없음'}
- 성별: ${userProfile?.gender === 'male' ? '남성' : '여성'}`;

  const sessionsText = sessions.map(session => {
    const sessionType = session.fortuneType === 'saju' ? '사주 이야기' :
                       session.fortuneType === 'tarot' ? '타로 이야기' :
                       session.fortuneType === 'astrology' ? '별자리 이야기' :
                       '이야기';
    return `${sessionType}: ${session.summary || session.title}`;
  }).join('\n');

  const userPrompt = `다음은 사용자가 나눈 대화들입니다:

${sessionsText}

이 대화들을 바탕으로 동화 같은 아름다운 이야기를 만들어주세요. 
실제 대화 내용보다는 전체적인 테마와 사용자의 여정에 초점을 맞춰서 
따뜻하고 의미 있는 이야기로 엮어주세요.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    return response.choices[0].message.content || "아름다운 이야기가 준비 중입니다...";
  } catch (error) {
    console.error("Storybook generation error:", error);
    return "지난 이야기들이 아름다운 추억으로 남아있습니다.";
  }
}

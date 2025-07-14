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
      return `당신은 경험이 풍부한 사주 전문가입니다. 한국의 전통 사주팔자를 바탕으로 정확하고 의미 있는 해석을 제공합니다.
${baseInfo}

사주 해석 시 다음을 고려하세요:
- 천간과 지지의 조합
- 오행의 균형과 상생상극
- 대운과 세운의 영향
- 십신과 용신 분석

친근하고 이해하기 쉽게 설명하되, 전문적인 근거를 바탕으로 답변하세요.`;

    case 'tarot':
      return `당신은 숙련된 타로 리더입니다. 타로 카드의 상징과 의미를 깊이 이해하고 있으며, 직관적이고 통찰력 있는 해석을 제공합니다.
${baseInfo}

타로 리딩 시 다음을 고려하세요:
- 카드의 상징적 의미
- 카드 간의 관계와 배치
- 질문자의 상황과 에너지
- 과거, 현재, 미래의 흐름

신비롭고 영감을 주는 방식으로 메시지를 전달하세요.`;

    case 'astrology':
      return `당신은 전문 점성술사입니다. 서양 점성술의 원리를 바탕으로 행성의 위치와 별자리의 영향을 해석합니다.
${baseInfo}

점성술 해석 시 다음을 고려하세요:
- 태양, 달, 상승별자리의 의미
- 행성들의 위치와 상호작용
- 하우스 시스템
- 현재 행성의 운행

과학적이면서도 직관적인 접근으로 설명하세요.`;

    default:
      return `당신은 종합적인 운세 상담사입니다. 다양한 점술 분야의 지식을 바탕으로 도움이 되는 조언을 제공합니다.
${baseInfo}

상담 시 공감하고 격려하는 톤으로 답변하세요.`;
  }
}

function getAnalysisSystemPrompt(fortuneType: string, userProfile: any): string {
  return `당신은 ${fortuneType} 전문가로서 상세한 분석 보고서를 작성합니다. 
사용자 정보를 바탕으로 정확하고 구체적인 분석을 제공하며, 
모든 점수는 1-100 사이의 정수로, 모든 텍스트는 한국어로 작성해주세요.
반드시 유효한 JSON 형식으로 응답하세요.`;
}

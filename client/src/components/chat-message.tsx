import { Bot, User } from "lucide-react";
import type { FortuneMessage } from "@shared/schema";

interface ChatMessageProps {
  message: FortuneMessage;
  fortuneType: string;
}

export default function ChatMessage({ message, fortuneType }: ChatMessageProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderSajuCards = (content: string) => {
    // Simple check for saju pillars in the content
    const sajuPattern = /년주.*?월주.*?일주.*?시주/s;
    if (sajuPattern.test(content)) {
      return (
        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">년주</div>
            <div className="font-bold text-mystical-purple">경오</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">월주</div>
            <div className="font-bold text-mystical-purple">기묘</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">일주</div>
            <div className="font-bold text-mystical-purple">갑신</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">시주</div>
            <div className="font-bold text-mystical-purple">신미</div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (message.role === "user") {
    return (
      <div className="flex items-start space-x-3 justify-end">
        <div className="bg-mystical-purple rounded-2xl rounded-tr-md p-4 max-w-xs text-white">
          <p>{message.content}</p>
          <span className="text-xs text-purple-200 mt-2 block">
            {formatTime(message.createdAt!)}
          </span>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="text-gray-600 h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-mystical-purple rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="text-white h-4 w-4" />
      </div>
      <div className="bg-white rounded-2xl rounded-tl-md p-4 max-w-sm shadow-sm">
        <p className="text-gray-800 mb-2">{message.content}</p>
        
        {/* Render saju cards if applicable */}
        {fortuneType === 'saju' && renderSajuCards(message.content)}
        
        <span className="text-xs text-gray-500 mt-2 block">
          {formatTime(message.createdAt!)}
        </span>
      </div>
    </div>
  );
}

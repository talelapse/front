import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { insertUserProfileSchema } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

// Step-by-step validation schemas
const step1Schema = z.object({
  birthDate: z.string().min(1, "생년월일을 선택해주세요"),
});

const step2Schema = z.object({
  birthTime: z.string().optional(),
  birthLocation: z.string().min(1, "출생지를 입력해주세요"),
});

const step3Schema = z.object({
  gender: z.enum(["male", "female"], { required_error: "성별을 선택해주세요" }),
});

const profileFormSchema = z.object({
  birthDate: z.string().min(1, "생년월일을 선택해주세요"),
  birthTime: z.string().optional(),
  birthLocation: z.string().min(1, "출생지를 입력해주세요"),
  gender: z.enum(["male", "female"], { required_error: "성별을 선택해주세요" }),
  preferredFortuneTypes: z.array(z.string()).default([]),
  isSetupComplete: z.boolean().default(true),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    mode: "onChange",
    defaultValues: {
      birthDate: "",
      birthTime: "",
      birthLocation: "",
      gender: undefined,
      preferredFortuneTypes: [],
      isSetupComplete: true,
    },
  });

  const profileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiRequest("POST", "/api/profile", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "프로필 설정 완료",
        description: "FateChat에 오신 것을 환영합니다!",
      });
      setLocation("/");
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
        description: "프로필 설정에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form submitted with data:", data);
    console.log("Current step:", step);
    console.log("Form errors:", form.formState.errors);
    
    // Basic step-by-step validation
    if (step === 1) {
      if (!data.birthDate) {
        form.setError("birthDate", { message: "생년월일을 선택해주세요" });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!data.birthLocation) {
        form.setError("birthLocation", { message: "출생지를 입력해주세요" });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!data.gender) {
        form.setError("gender", { message: "성별을 선택해주세요" });
        return;
      }
      // Final submission
      profileMutation.mutate(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Generate year options (last 100 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-deep-navy">
      {/* Progress Bar */}
      <div className="bg-white/10 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>기본 정보 입력</span>
            <span>{step}/3</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-mystical-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <CalendarDays className="text-mystical-purple h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {step === 1 && "생년월일을 알려주세요"}
                {step === 2 && "출생 정보를 입력해주세요"}
                {step === 3 && "마지막 단계입니다"}
              </h2>
              <p className="text-gray-600">
                {step === 1 && "정확한 운세를 위해 출생 정보가 필요해요"}
                {step === 2 && "출생 시간과 장소를 알려주세요"}
                {step === 3 && "성별과 관심 분야를 선택해주세요"}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>생년월일</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="focus:ring-2 focus:ring-mystical-purple"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="birthTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>출생 시간 (선택사항)</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              {...field}
                              className="focus:ring-2 focus:ring-mystical-purple"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>출생지</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="예: 서울특별시"
                              {...field}
                              className="focus:ring-2 focus:ring-mystical-purple"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>성별</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="focus:ring-2 focus:ring-mystical-purple">
                                <SelectValue placeholder="성별을 선택하세요" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">남성</SelectItem>
                              <SelectItem value="female">여성</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="flex space-x-3">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                    >
                      이전
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="flex-1 bg-mystical-purple hover:bg-purple-700"
                    disabled={profileMutation.isPending}
                  >
                    {step === 3 ? (profileMutation.isPending ? "설정 중..." : "완료") : "다음"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

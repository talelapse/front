import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { fortuneService } from "./services/fortuneService";
import { insertUserProfileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }
      
      const profile = await storage.getUserProfile(userId);
      res.json({ ...user, profile });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "사용자 정보를 가져오는데 실패했습니다." });
    }
  });

  // User profile routes
  app.post('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileData = insertUserProfileSchema.parse({
        ...req.body,
        userId,
        birthDate: new Date(req.body.birthDate),
      });

      const existingProfile = await storage.getUserProfile(userId);
      let profile;

      if (existingProfile) {
        profile = await storage.updateUserProfile(userId, profileData);
      } else {
        profile = await storage.createUserProfile(profileData);
      }

      res.json(profile);
    } catch (error) {
      console.error("Error creating/updating profile:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "잘못된 입력 데이터입니다.", errors: error.errors });
      } else {
        res.status(500).json({ message: "프로필 저장에 실패했습니다." });
      }
    }
  });

  app.get('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "프로필을 찾을 수 없습니다." });
      }

      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "프로필을 가져오는데 실패했습니다." });
    }
  });

  // Fortune session routes
  app.post('/api/fortune/sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { fortuneType, title } = req.body;

      if (!fortuneType || !title) {
        return res.status(400).json({ message: "운세 유형과 제목이 필요합니다." });
      }

      const session = await fortuneService.startFortuneSession(userId, fortuneType, title);
      res.json(session);
    } catch (error) {
      console.error("Error creating fortune session:", error);
      res.status(500).json({ message: "운세 세션 생성에 실패했습니다." });
    }
  });

  app.get('/api/fortune/sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getUserFortuneSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching fortune sessions:", error);
      res.status(500).json({ message: "운세 히스토리를 가져오는데 실패했습니다." });
    }
  });

  app.get('/api/fortune/sessions/:id', isAuthenticated, async (req: any, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.getFortuneSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ message: "세션을 찾을 수 없습니다." });
      }

      // Check if session belongs to user
      if (session.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "접근 권한이 없습니다." });
      }

      const messages = await storage.getSessionMessages(sessionId);
      const result = await storage.getFortuneResult(sessionId);

      res.json({ session, messages, result });
    } catch (error) {
      console.error("Error fetching fortune session:", error);
      res.status(500).json({ message: "세션 정보를 가져오는데 실패했습니다." });
    }
  });

  // Chat message routes
  app.post('/api/fortune/sessions/:id/messages', isAuthenticated, async (req: any, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const { message } = req.body;
      const userId = req.user.claims.sub;

      if (!message) {
        return res.status(400).json({ message: "메시지가 필요합니다." });
      }

      const session = await storage.getFortuneSession(sessionId);
      if (!session || session.userId !== userId) {
        return res.status(404).json({ message: "세션을 찾을 수 없습니다." });
      }

      const botMessage = await fortuneService.sendMessage(sessionId, message, userId);
      res.json(botMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "메시지 전송에 실패했습니다." });
    }
  });

  // Complete fortune session
  app.post('/api/fortune/sessions/:id/complete', isAuthenticated, async (req: any, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const userId = req.user.claims.sub;

      const session = await storage.getFortuneSession(sessionId);
      if (!session || session.userId !== userId) {
        return res.status(404).json({ message: "세션을 찾을 수 없습니다." });
      }

      await fortuneService.completeSession(sessionId);
      res.json({ message: "운세 상담이 완료되었습니다." });
    } catch (error) {
      console.error("Error completing session:", error);
      res.status(500).json({ message: "세션 완료에 실패했습니다." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

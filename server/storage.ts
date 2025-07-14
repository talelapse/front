import {
  users,
  userProfiles,
  fortuneSessions,
  fortuneMessages,
  fortuneResults,
  type User,
  type UpsertUser,
  type InsertUserProfile,
  type UserProfile,
  type InsertFortuneSession,
  type FortuneSession,
  type InsertFortuneMessage,
  type FortuneMessage,
  type InsertFortuneResult,
  type FortuneResult,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lt } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // User profile operations
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile>;
  
  // Fortune session operations
  createFortuneSession(session: InsertFortuneSession): Promise<FortuneSession>;
  getFortuneSession(id: number): Promise<FortuneSession | undefined>;
  getUserFortuneSessions(userId: string): Promise<FortuneSession[]>;
  getRecentUserSessions(userId: string, hours: number): Promise<FortuneSession[]>;
  getOldUserSessions(userId: string, hours: number): Promise<FortuneSession[]>;
  updateFortuneSession(id: number, updates: Partial<InsertFortuneSession>): Promise<FortuneSession>;
  
  // Fortune message operations
  createFortuneMessage(message: InsertFortuneMessage): Promise<FortuneMessage>;
  getSessionMessages(sessionId: number): Promise<FortuneMessage[]>;
  
  // Fortune result operations
  createFortuneResult(result: InsertFortuneResult): Promise<FortuneResult>;
  getFortuneResult(sessionId: number): Promise<FortuneResult | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // User profile operations
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [created] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    return created;
  }

  async updateUserProfile(userId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile> {
    const [updated] = await db
      .update(userProfiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updated;
  }

  // Fortune session operations
  async createFortuneSession(session: InsertFortuneSession): Promise<FortuneSession> {
    const [created] = await db
      .insert(fortuneSessions)
      .values(session)
      .returning();
    return created;
  }

  async getFortuneSession(id: number): Promise<FortuneSession | undefined> {
    const [session] = await db
      .select()
      .from(fortuneSessions)
      .where(eq(fortuneSessions.id, id));
    return session;
  }

  async getUserFortuneSessions(userId: string): Promise<FortuneSession[]> {
    return await db
      .select()
      .from(fortuneSessions)
      .where(and(
        eq(fortuneSessions.userId, userId),
        eq(fortuneSessions.hasUserMessage, true)
      ))
      .orderBy(desc(fortuneSessions.createdAt));
  }

  async getRecentUserSessions(userId: string, hours: number): Promise<FortuneSession[]> {
    const cutoffTime = new Date(Date.now() - (hours * 60 * 60 * 1000));
    return await db
      .select()
      .from(fortuneSessions)
      .where(and(
        eq(fortuneSessions.userId, userId),
        eq(fortuneSessions.hasUserMessage, true),
        gte(fortuneSessions.createdAt, cutoffTime)
      ))
      .orderBy(desc(fortuneSessions.createdAt));
  }

  async getOldUserSessions(userId: string, hours: number): Promise<FortuneSession[]> {
    const cutoffTime = new Date(Date.now() - (hours * 60 * 60 * 1000));
    return await db
      .select()
      .from(fortuneSessions)
      .where(and(
        eq(fortuneSessions.userId, userId),
        eq(fortuneSessions.hasUserMessage, true),
        lt(fortuneSessions.createdAt, cutoffTime)
      ))
      .orderBy(desc(fortuneSessions.createdAt));
  }

  async updateFortuneSession(id: number, updates: Partial<InsertFortuneSession>): Promise<FortuneSession> {
    const [updated] = await db
      .update(fortuneSessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(fortuneSessions.id, id))
      .returning();
    return updated;
  }

  // Fortune message operations
  async createFortuneMessage(message: InsertFortuneMessage): Promise<FortuneMessage> {
    const [created] = await db
      .insert(fortuneMessages)
      .values(message)
      .returning();
    return created;
  }

  async getSessionMessages(sessionId: number): Promise<FortuneMessage[]> {
    return await db
      .select()
      .from(fortuneMessages)
      .where(eq(fortuneMessages.sessionId, sessionId))
      .orderBy(fortuneMessages.createdAt);
  }

  // Fortune result operations
  async createFortuneResult(result: InsertFortuneResult): Promise<FortuneResult> {
    const [created] = await db
      .insert(fortuneResults)
      .values(result)
      .returning();
    return created;
  }

  async getFortuneResult(sessionId: number): Promise<FortuneResult | undefined> {
    const [result] = await db
      .select()
      .from(fortuneResults)
      .where(eq(fortuneResults.sessionId, sessionId));
    return result;
  }
}

export const storage = new DatabaseStorage();

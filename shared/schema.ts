import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User profile with birth information for fortune telling
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  birthDate: timestamp("birth_date").notNull(),
  birthTime: varchar("birth_time"), // Format: "HH:mm"
  birthLocation: varchar("birth_location").notNull(),
  gender: varchar("gender").notNull(), // "male" or "female"
  preferredFortuneTypes: jsonb("preferred_fortune_types").$type<string[]>().default([]),
  isSetupComplete: boolean("is_setup_complete").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fortune sessions for tracking conversations
export const fortuneSessions = pgTable("fortune_sessions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  fortuneType: varchar("fortune_type").notNull(), // "saju", "tarot", "astrology"
  title: varchar("title").notNull(),
  summary: text("summary"),
  isCompleted: boolean("is_completed").default(false),
  hasUserMessage: boolean("has_user_message").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Messages within fortune sessions
export const fortuneMessages = pgTable("fortune_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => fortuneSessions.id).notNull(),
  role: varchar("role").notNull(), // "user" or "assistant"
  content: text("content").notNull(),
  metadata: jsonb("metadata").$type<any>().default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// Fortune results with detailed analysis
export const fortuneResults = pgTable("fortune_results", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => fortuneSessions.id).notNull(),
  fortuneType: varchar("fortune_type").notNull(),
  overallScore: integer("overall_score"),
  loveScore: integer("love_score"),
  wealthScore: integer("wealth_score"),
  healthScore: integer("health_score"),
  analysis: jsonb("analysis").$type<any>().notNull(),
  recommendations: text("recommendations"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  fortuneSessions: many(fortuneSessions),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const fortuneSessionsRelations = relations(fortuneSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [fortuneSessions.userId],
    references: [users.id],
  }),
  messages: many(fortuneMessages),
  result: one(fortuneResults, {
    fields: [fortuneSessions.id],
    references: [fortuneResults.sessionId],
  }),
}));

export const fortuneMessagesRelations = relations(fortuneMessages, ({ one }) => ({
  session: one(fortuneSessions, {
    fields: [fortuneMessages.sessionId],
    references: [fortuneSessions.id],
  }),
}));

export const fortuneResultsRelations = relations(fortuneResults, ({ one }) => ({
  session: one(fortuneSessions, {
    fields: [fortuneResults.sessionId],
    references: [fortuneSessions.id],
  }),
}));

// Insert schemas
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFortuneSessionSchema = createInsertSchema(fortuneSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFortuneMessageSchema = createInsertSchema(fortuneMessages).omit({
  id: true,
  createdAt: true,
});

export const insertFortuneResultSchema = createInsertSchema(fortuneResults).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertFortuneSession = z.infer<typeof insertFortuneSessionSchema>;
export type FortuneSession = typeof fortuneSessions.$inferSelect;
export type InsertFortuneMessage = z.infer<typeof insertFortuneMessageSchema>;
export type FortuneMessage = typeof fortuneMessages.$inferSelect;
export type InsertFortuneResult = z.infer<typeof insertFortuneResultSchema>;
export type FortuneResult = typeof fortuneResults.$inferSelect;

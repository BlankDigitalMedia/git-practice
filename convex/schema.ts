import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  emailSubmissions: defineTable({
    email: v.string(),
    submittedAt: v.number(),
    source: v.optional(v.string()),
  }).index("by_email", ["email"]),
});

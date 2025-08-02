import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitEmail = mutation({
  args: { 
    email: v.string(),
    source: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { email, source } = args;
    
    // Check if email already exists
    const existingSubmission = await ctx.db
      .query("emailSubmissions")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    
    if (existingSubmission) {
      return { 
        success: false, 
        message: "Email already submitted",
        id: existingSubmission._id 
      };
    }
    
    // Insert new email submission
    const id = await ctx.db.insert("emailSubmissions", {
      email,
      submittedAt: Date.now(),
      source: source || "landing-page",
    });
    
    return { 
      success: true, 
      message: "Email submitted successfully",
      id 
    };
  },
});

export const getAllSubmissions = query({
  handler: async (ctx) => {
    return await ctx.db.query("emailSubmissions").collect();
  },
});

export const getSubmissionCount = query({
  handler: async (ctx) => {
    const submissions = await ctx.db.query("emailSubmissions").collect();
    return submissions.length;
  },
});

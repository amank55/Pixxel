import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import * as internal from "./_generated/api";
// Ensure internal.users.getCurrentUser exists in ./_generated/api

// Get all projects for the current user
export const getUserProjects = query(async (ctx) => {
  // Get the current user
  const user = await ctx.runQuery(internal.users.getCurrentUser);

  // Get user's projects, ordered by most recently updated
  const projects = await ctx.db
    .query("projects")
    .withIndex("by_user_updated", (q: any) => q.eq("userId", user._id))
    .order("desc")
    .collect();

  return projects;
});

export const create = mutation({
  args: {
    title: v.string(),
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    width: v.number(),
    height: v.number(),
    canvasState: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);

    // Check plan limits for free users
    if (user.plan === "free") {
      const projectCount = await ctx.db
        .query("projects")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      if (projectCount.length >= 3) {
        throw new Error(
          "Free plan limited to 3 projects. Upgrade to Pro for unlimited projects."
        );
      }
    }

    // Insert the new project
    return await ctx.db.insert("projects", {
      userId: user._id,
      title: args.title,
      originalImageUrl: args.originalImageUrl,
      currentImageUrl: args.currentImageUrl,
      thumbnailUrl: args.thumbnailUrl,
      width: args.width,
      height: args.height,
      canvasState: args.canvasState,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    });
  },
});
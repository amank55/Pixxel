// hooks/use-plan-access.js
import { useAuth } from "@clerk/nextjs";

export function usePlanAccess() {
  const { has } = useAuth();

  const isPro = has?.({ plan: "pro" }) || false;
  const isFree = !isPro; // If not pro, then free (default)

  // Define which tools are available for each plan
  const planAccess = {
    // Free plan tools
    resize: true,
    crop: true,
    adjust: true,
    text: true,

    // Pro-only tools
    background: isPro,
    ai_extender: isPro,
    ai_edit: isPro,
  };

  // Helper function to check if user has access to a specific tool
  type ToolId = 'resize' | 'crop' | 'adjust' | 'text' | 'background' | 'ai_extender' | 'ai_edit';

  const hasAccess = (toolId: ToolId): boolean => {
    return planAccess[toolId] === true;
  };

  // Get restricted tools that user doesn't have access to
  const getRestrictedTools = (): ToolId[] => {
    return Object.entries(planAccess)
      .filter(([_, access]) => !access)
      .map(([toolId]) => toolId as ToolId);
  };

  // Check if user has reached project limits
  const canCreateProject = (currentProjectCount: number): boolean => {
    if (isPro) return true;
    return currentProjectCount < 3; // Free limit
  };

  // Check if user has reached export limits
  const canExport = (currentExportsThisMonth: number): boolean => {
    if (isPro) return true;
    return currentExportsThisMonth < 20;
  };

  return {
    userPlan: isPro ? "pro" : "free_user",
    isPro,
    isFree,
    hasAccess,
    planAccess,
    getRestrictedTools,
    canCreateProject,
    canExport,
  };
}
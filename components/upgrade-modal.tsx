"use client";

import React from "react";
import { X, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PricingTable } from "@clerk/nextjs";

type ToolId = "background" | "ai_extender" | "ai_edit" | "projects"; // Add "projects" here

interface UpgradeModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  restrictedTool?: ToolId;
  reason?: string;
}

export function UpgradeModal({ isOpen, onCloseAction, restrictedTool, reason }: UpgradeModalProps) {
  const getToolName = (toolId: ToolId | undefined) => {
    const toolNames: Record<ToolId, string> = {
      background: "AI Background Tools",
      ai_extender: "AI Image Extender",
      ai_edit: "AI Editor",
      projects: "More than 3 Projects", // Add this line
    };
    return toolId ? toolNames[toolId] : "Premium Feature";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="sm:max-w-4xl bg-slate-800 border-white/10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-yellow-500" />
            <DialogTitle className="text-2xl font-bold text-white">
              Upgrade to Pro
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restriction Message */}
          {restrictedTool && (
            <Alert className="bg-amber-500/10 border-amber-500/20">
              <Zap className="h-5 w-5 text-amber-400" />
              <AlertDescription className="text-amber-300/80">
                <div className="font-semibold text-amber-400 mb-1">
                  {getToolName(restrictedTool)} - Pro Feature
                </div>
                {reason ||
                  `${getToolName(restrictedTool)} is only available on the Pro plan. Upgrade now to unlock this powerful feature and more.`}
              </AlertDescription>
            </Alert>
          )}

           <PricingTable
            checkoutProps={{
              appearance: {
                elements: {
                  drawerRoot: {
                    zIndex: 20000,
                  },
                },
              },
            }}
          />
        </div>
        <DialogFooter className="justify-center">
          <Button
            variant="ghost"
            onClick={onCloseAction}
            className="text-white/70 hover:text-white"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
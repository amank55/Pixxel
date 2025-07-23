"use client";

import { ConvexReactClient } from "convex/react";

import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not defined");
}
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

import type { PropsWithChildren } from "react";

export function ConvexClientProvider({ children }: PropsWithChildren) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
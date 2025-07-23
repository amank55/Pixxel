import { FloatingShapes } from "@/components/floating-shapes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/Convex-Client-Provider";
import { shadesOfPurple } from '@clerk/themes'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pixxel",
  description: "Professional image editing powered by AI",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-text.png" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange


        /> 

         <ClerkProvider
           publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            appearance={{
              baseTheme: shadesOfPurple,
            }}>
          <ConvexClientProvider>
            <Header/>
            <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
             <FloatingShapes />
            <Toaster richColors />

                {children}
              </main>           
            </ConvexClientProvider>
            </ClerkProvider>
      </body>
    </html>
  );
}

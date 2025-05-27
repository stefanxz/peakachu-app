import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Sidebar } from "lucide-react";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarToggleButton } from "@/components/custom/SideBarToggleButton";

export const metadata: Metadata = {
  title: "Peakachu",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="flex h-screen">
        <TRPCReactProvider>
          <SidebarProvider>
            <AppSidebar></AppSidebar>
            <main className="flex-1 lg:pl-15">{children}</main>
          </SidebarProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

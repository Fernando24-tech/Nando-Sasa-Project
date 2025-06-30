"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import LoveNav from "@/components/LoveNav";
import { AuthProvider } from "@/components/AuthProvider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith("/login");
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        {showNav && <LoveNav />}
        <main className="flex-1">{children}</main>
      </div>
    </AuthProvider>
  );
} 
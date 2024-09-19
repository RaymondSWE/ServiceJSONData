"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/main/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, isLoaded, router]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`flex-1 transition-transform duration-300 ${
          isSidebarOpen ? "transform translate-x-0 md:translate-x-[200px]" : "transform translate-x-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

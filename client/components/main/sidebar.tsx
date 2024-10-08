"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toggleSidebar } from "@/store/sidebar-slice";
import { cn } from "@/lib/utils";
import { SidebarMenu } from "@/components/main/sidebar-menu";
import { Button } from "@/components/ui/button";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { LanguageDropdown } from "../ui/language-dropdown";
import { useParams } from "next/navigation";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
  const { locale } = useParams() as { locale: string };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 shadow-md dark:shadow-zinc-800",
        isSidebarOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle
        isSidebarOpen={isSidebarOpen}
        setIsOpen={() => dispatch(toggleSidebar())}
      />
      <div className="flex items-center justify-center ">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            isSidebarOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
        </Button>
      </div>
      <div className="relative h-full flex flex-col px-3 overflow-y-auto mt-12">
        <LanguageDropdown isSidebarOpen={isSidebarOpen}  />
        <SidebarMenu isSidebarOpen={isSidebarOpen} locale={locale as string} />
      </div>
    </aside>
  );
};

export default Sidebar;

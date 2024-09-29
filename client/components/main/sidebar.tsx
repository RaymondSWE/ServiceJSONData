"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toggleSidebar } from "@/store/sidebar-slice";
import { cn } from "@/lib/utils";
import { SidebarMenu } from "@/components/main/sidebar-menu";
import { Button } from "@/components/ui/button";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import Image from "next/image";
import { LanguageDropdown } from "../ui/language-dropdown";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const locale = useSelector((state: RootState) => state.locale.locale);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 shadow-md dark:shadow-zinc-800",
        isOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle
        isOpen={isOpen}
        setIsOpen={() => dispatch(toggleSidebar())}
      />
      <div className="flex items-center justify-center ">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <div className="flex items-center gap-2 mt-8">
            <Image
              src="/img/raysafe.png"
              alt="Raysafe Logo"
              width={isOpen ? 200 : 100}
              height={isOpen ? 200 : 100}
              className={cn(
                "transition-[transform,opacity,display] ease-in-out duration-300",
                isOpen === false
                  ? "translate-x-0 opacity-100"
                  : "translate-x-0 opacity-100",
              )}
            />
          </div>
        </Button>
      </div>
      <div className="flex mt-12 justify-center">
        <LanguageDropdown isOpen={isOpen}  />
      </div>
      <div className="relative h-full flex flex-col px-3 overflow-y-auto">
        <SidebarMenu isOpen={isOpen} locale={locale} />
      </div>
    </aside>
  );
};

export default Sidebar;

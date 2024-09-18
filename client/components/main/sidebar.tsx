"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toggleSidebar } from "@/store/sidebar-slice";
import { cn } from "@/lib/utils";
import { SidebarMenu } from "@/components/main/sidebar-menu";
import { Button } from "@/components/ui/button";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import Image from "next/image";


const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle
        isOpen={isOpen}
        setIsOpen={() => dispatch(toggleSidebar())}
      />
      <div className="flex items-center justify-center">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2 mt-8">
            <Image
              src="/img/raysafe.png"
              alt="Raysafe Logo"
              width={150}
              height={120}
              className={cn(
                "transition-[transform,opacity,display] ease-in-out duration-300",
                isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100",
              )}
            />
          </Link>
        </Button>
      </div>
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <SidebarMenu isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;

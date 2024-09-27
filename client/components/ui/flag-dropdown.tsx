"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { CheckIcon, Globe2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useDispatch } from "react-redux";
import { setLocale } from "@/store/locale-slice";

interface FlagDropdownProps {
  isOpen: boolean;
  locale: string;
}

export const FlagDropdown = ({ isOpen, locale }: FlagDropdownProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLocaleChange = (newLocale: string) => {
    dispatch(setLocale(newLocale));
    router.push(`/${newLocale}`);
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost" 
                className={cn(
                  "flex items-center px-4 py-3 space-x-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isOpen ? "w-full justify-center" : "justify-center"
                )}
              >
                <Globe2Icon className="w-5 h-5" />
                <span className={cn(isOpen ? "block" : "hidden")}>
                  {locale === "en" ? "English" : "Swedish"}
                </span>
                <span className={cn(!isOpen ? "block text-xs" : "hidden")}>
                  {locale === "en" ? "ENG" : "SWE"}
                </span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent side="right">
              <p>Select Language</p>
            </TooltipContent>
          )}
        </Tooltip>

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => handleLocaleChange("en")}
            className={cn(locale === "en" && "bg-muted/5"
            )}
          >
            {isOpen ? "English" : "ENG"}
            {locale === "en" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLocaleChange("sv")}
            className={cn(locale === "sv" && "bg-muted/5")}
          >
            {isOpen ? "Swedish" : "SWE"}
            {locale === "sv" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

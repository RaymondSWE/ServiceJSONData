"use client";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter, useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { CheckIcon, Globe2Icon } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";

interface LanguageDropdownProps {
  isSidebarOpen: boolean;
}

export const LanguageDropdown = ({ isSidebarOpen }: LanguageDropdownProps) => {
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations("languageDropdown");
  const pathname = usePathname();



  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.replace(newPathname);
    }
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost" 
                className={cn("space-x-2 text-sm")}
              >
                <Globe2Icon className="w-5 h-5" />
                <span className={cn(isSidebarOpen ? "block" : "hidden")}>
                  {locale === "en" ? t("english") : t("swedish")}
                </span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {!isSidebarOpen &&  (
            <TooltipContent
              side="right"
              sideOffset={5}
            >
              {locale === "en" ? t("tooltipEnglish") : t("tooltipSwedish")}
            </TooltipContent>
          )}
        </Tooltip>
            
        <DropdownMenuContent align="start" side="right" sideOffset={25}>
          <DropdownMenuLabel>{t("chooseLanguage")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleLocaleChange("en")}
          >
            {isSidebarOpen ? t("english") : t("shortEnglish")}
            {locale === "en" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLocaleChange("sv")}
          >
            {isSidebarOpen ? t("swedish") : t("shortSwedish")}
            {locale === "sv" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuArrow className="fill-border" />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

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
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "@/store/locale-slice";
import { RootState } from "@/store/store";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";
import { useEffect } from "react"; 

interface LanguageDropdownProps {
  isOpen: boolean;
}

export const LanguageDropdown = ({ isOpen }: LanguageDropdownProps) => {
  const { locale } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentLocale = useSelector((state: RootState) => state.locale.locale); 
  const t = useTranslations("languageDropdown");
  const pathname = usePathname();

  useEffect(() => {
    if (locale && locale !== currentLocale) {
      if (typeof locale === 'string') {
        dispatch(setLocale(locale));
      }
    }
  }, [locale, currentLocale, dispatch]);

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      dispatch(setLocale(newLocale));
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
                <span className={cn(isOpen ? "block" : "hidden")}>
                  {currentLocale === "en" ? t("english") : t("swedish")}
                </span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {!isOpen &&  (
            <TooltipContent
              side="right"
              sideOffset={5}
            >
              {currentLocale === "en" ? t("tooltipEnglish") : t("tooltipSwedish")}
            </TooltipContent>
          )}
        </Tooltip>
            
        <DropdownMenuContent align="start" side="right" sideOffset={25}>
          <DropdownMenuLabel>{t("chooseLanguage")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleLocaleChange("en")}
          >
            {isOpen ? t("english") : t("shortEnglish")}
            {currentLocale === "en" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLocaleChange("sv")}
          >
            {isOpen ? t("swedish") : t("shortSwedish")}
            {currentLocale === "sv" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuArrow className="fill-border" />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

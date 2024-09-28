import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { CheckIcon, Globe2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLocale } from "@/store/locale-slice";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

interface LanguageDropdownProps {
  isOpen: boolean;
  locale: string;
}

export const LanguageDropdown = ({ isOpen, locale }: LanguageDropdownProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLocaleChange = (newLocale: string) => {
    dispatch(setLocale(newLocale));
    router.push(`/${newLocale}`);
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost" 
                className={cn("space-x-2 text-sm",)}
              >
                <Globe2Icon className="w-5 h-5" />
                <span className={cn(isOpen ? "block" : "hidden")}>
                  {locale === "en" ? "English" : "Swedish"}
                </span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {!isOpen &&  (
            <TooltipContent
              side="right"
              sideOffset={5}
            >
              {locale === "en" ? "English" : "Swedish"}
            </TooltipContent>
          )}
        </Tooltip>
            
        <DropdownMenuContent align="start" side="right" sideOffset={25}>
          <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleLocaleChange("en")}>
            {isOpen ? "English" : "ENG"}
            {locale === "en" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLocaleChange("sv")}          >
            {isOpen ? "Swedish" : "SWE"}
            {locale === "sv" && <CheckIcon className="w-4 h-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuArrow className="fill-border" />

        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

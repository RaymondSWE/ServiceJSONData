import { Heading } from "@/components/ui/heading";
import HomeLayout from "./(main)/layout";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { TechList } from "@/components/main/tech-list";

export default function Home() {
  const t = useTranslations("homePage"); 

  return (
    <HomeLayout>
      <div className="flex-col">
        <div className="flex-1 space-y-4 mt-4  p-8">
        <Heading 
        title={t("homePageTitle")} 
        description={t("homePageDescription")}
        />
        <Separator />
        <TechList />
        </div>
      </div>
    </HomeLayout>
  );
}

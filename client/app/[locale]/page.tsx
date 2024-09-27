import HomeLayout from "./(main)/layout";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("homePage"); 

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-full">
        {t("welcomeMessage")} 
      </div>
    </HomeLayout>
  );
}

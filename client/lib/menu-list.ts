"use client"; 

import { Home, Ruler, LucideIcon } from "lucide-react"; 
import { useTranslations } from "next-intl";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, locale: string): Group[] {
  // TODO:: Dunno if its a good idea to use useTranslations here, because it is a hook and it should be used inside a component 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('sidebarMenu');

  return [
    {
      groupLabel: t('groupLabelGeneral'), 
      menus: [
        {
          href: `/${locale}`, 
          label: t('home.label'), 
          active: pathname === `/${locale}`, 
          icon: Home,
          submenus: []
        },
      
      ],
    },
    {
      groupLabel: t('groupLabelDevice'),  
      menus: [
        {
          href: `/${locale}/measurement`, 
          label: t('measurement.label'), 
          active: pathname.includes("/measurement"),
          icon: Ruler,
          submenus: [
            {
              href: `/${locale}/measurement/dashboard`, 
              label: t('measurement.dashboard'), 
              active: pathname.includes("/measurement/dashboard"),
            },
            {
              href: `/${locale}/measurement/view`, 
              label: t('measurement.view'), 
              active: pathname.includes("/measurement/view"),
            },
            {
              href: `/${locale}/measurement/add`, 
              label: t('measurement.add'), 
              active: pathname.includes("/measurement/add"),
            },
          ],
        },
      ],
    },
  ];
}

import { LayoutGrid, User as UserIcon, Ruler, LucideIcon } from "lucide-react";

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
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Main",
      menus: [
        {
          href: `/about`,
          label: "About Me",
          active: pathname.includes("/about"),
          icon: UserIcon,
          submenus: [],
        },
        {
          href: `/use-case`,
          label: "Use-Case Assignment",
          active: pathname.includes("/use-case"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `/measurement`,
          label: "Measurement Data",
          active: pathname.includes("/measurement"),
          icon: Ruler,
          submenus: [
            {
              href: `/measurement/dashboard`,
              label: "Dashboard",
              active: pathname.includes("/measurement/dashboard"),
            },
            {
              href: `/measurement/view`,
              label: "View Data",
              active: pathname.includes("/measurement/view"),
            },
            {
              href: `/measurement/add`,
              label: "Add Data",
              active: pathname.includes("/measurement/add"),
            },
          ],
        },
      ],
    },
  ];
}

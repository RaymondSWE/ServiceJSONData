import { useTranslations } from "next-intl";

export const useTechItems = () => {
  const t = useTranslations('techItems');

  const techItems = [
    {
      title: t('nextjs.title'),
      description: t('nextjs.description'),
      imageUrl: '/img/techicon/nextjs.png',
    },
    {
      title: t('shadcn.title'),
      description: t('shadcn.description'),
      imageUrl: '/img/techicon/shadcn.svg',
    },
    {
      title: t('tailwindcss.title'),
      description: t('tailwindcss.description'),
      imageUrl: '/img/techicon/tailwind.png',
    },
    {
      title: t('typescript.title'),
      description: t('typescript.description'),
      imageUrl: '/img/techicon/typescript.png',
    },
    {
      title: t('redux.title'),
      description: t('redux.description'),
      imageUrl: '/img/techicon/redux.png',
    },
    {
      title: t('reacthookform.title'),
      description: t('reacthookform.description'),
      imageUrl: '/img/techicon/react.png',
    },
    {
      title: t('zod.title'),
      description: t('zod.description'),
      imageUrl: '/img/techicon/zod.svg',
    },
    {
      title: t('framermotion.title'),
      description: t('framermotion.description'),
      imageUrl: '/img/techicon/framer.png',
    },
    {
      title: t('recharts.title'),
      description: t('recharts.description'),
      imageUrl: '/img/techicon/react.png',
    },
    {
      title: t('axios.title'),
      description: t('axios.description'),
      imageUrl: '/img/techicon/axios.svg',
    },
    {
      title: t('clerk.title'),
      description: t('clerk.description'),
      imageUrl: '/img/techicon/clerk.svg',
    },
    {
      title: t('tanstacktable.title'),
      description: t('tanstacktable.description'),
      imageUrl: '/img/techicon/tanstack.svg',
    },
    {
      title: t('spring.title'),
      description: t('spring.description'),
      imageUrl: '/img/techicon/spring.png',
    },
    {
      title: t('docker.title'),
      description: t('docker.description'),
      imageUrl: '/img/techicon/docker.png',
    },
    {
      title: t('mysql.title'),
      description: t('mysql.description'),
      imageUrl: '/img/techicon/mysql.png',
    },
  ];

  return techItems;
};

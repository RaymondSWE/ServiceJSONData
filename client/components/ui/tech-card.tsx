import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TechCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const TechCard = ({ title, description, imageUrl }: TechCardProps) => {
  return (
    <Card className="flex flex-col items-center w-48">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex justify-center">
          <Image 
            src={imageUrl} 
            alt={title} 
            width={59} 
            height={50} 
            className="rounded-lg" 
          />
        </div>
        <CardTitle className="mt-4 text-lg text-center">{title}</CardTitle>
        <CardDescription className="text-center text-xs">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

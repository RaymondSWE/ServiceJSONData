import { TechCard } from '@/components/ui/tech-card';
import { useTechItems } from '@/lib/tech-items';

export const TechList: React.FC = () => {
  const techItems = useTechItems(); 


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 p-4 gap-4">
      {techItems.map((tech, index) => (
        <TechCard
          key={index}
          title={tech.title}
          description={tech.description}
          imageUrl={tech.imageUrl}
        />
      ))}
    </div>
  );
};

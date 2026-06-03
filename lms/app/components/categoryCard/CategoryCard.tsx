import {
  Boxes,
  Code,
  Briefcase,
  TrendingUp,
  Camera,
  Music,
  FileText,
  Heart,
  BarChart3,
  Smartphone,
} from "lucide-react";
import React from "react";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  name: string;
  icon: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Boxes: <Boxes />,
  Code: <Code />,
  Briefcase: <Briefcase />,
  TrendingUp: <TrendingUp />,
  Camera: <Camera />,
  Music: <Music />,
  FileText: <FileText />,
  Heart: <Heart />,
  BarChart3: <BarChart3 />,
  Smartphone: <Smartphone />,
};

const CategoryCard = ({ name, icon }: CategoryCardProps) => {
  return (
    <div className={styles.categoryCard}>
      {iconMap[icon] || <Boxes />}
      <p>{name}</p>
    </div>
  );
};

export default CategoryCard;

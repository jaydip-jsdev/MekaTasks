import { Category } from "./category";

export interface CardProps {
  title: string;
  slug: string;
  description: string;
  category: Category | string;
  image: string;

  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;

  isAuthenticated?: boolean;
  fromCats?: boolean;

  isEnrolled?: boolean;
  handleEnroll?: () => void;
}

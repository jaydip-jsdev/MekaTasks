export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug: string;
}

export interface Blog {
  id: string;
  _id: string;
  title: string;
  desc: string;
  description: string;
  content: string;
  likes: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPayload {
  title: string;
  description: string;
  content: string;
}

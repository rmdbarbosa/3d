export type AdminMessageVariant = "success" | "error";

export type AdminMessage = {
  text: string;
  variant: AdminMessageVariant;
};

export type AdminGalleryItem = {
  id: string;
  title: string;
  category: string;
  alt: string;
  imagePath: string;
  imageSrc: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  imageSrc: string;
  alt: string;
  category: string;
  images: GalleryItemImage[];
};

export type GalleryItemImage = {
  imagePath: string;
  imageSrc: string;
};

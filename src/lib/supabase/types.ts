export type Database = {
  public: {
    Tables: {
      gallery_items: {
        Row: {
          id: string;
          title: string;
          category: string;
          alt: string;
          image_path: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          alt: string;
          image_path: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          alt?: string;
          image_path?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      gallery_item_images: {
        Row: {
          id: string;
          gallery_item_id: string;
          image_path: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          gallery_item_id: string;
          image_path: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          gallery_item_id?: string;
          image_path?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gallery_item_images_gallery_item_id_fkey";
            columns: ["gallery_item_id"];
            referencedRelation: "gallery_items";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

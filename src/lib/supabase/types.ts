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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

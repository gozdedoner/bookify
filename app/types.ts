// app/types.ts

export type Book = {
  id: string;
  title: string;
  author: string;
  cover?: string;
  // İstersen ekstra alanlar ekleyebilirsin:
  // description?: string;
  // publishedDate?: string;
};

export type GoogleBookItem = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export type GoogleApiResponse = {
  items?: GoogleBookItem[];
  totalItems?: number; // ✅ opsiyonel yaptık
};

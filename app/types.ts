// app/types.ts dosyasının olması gereken tam hali

export type Book = {
  id: string;
  title: string;
  author: string;
  cover?: string;
  // Kitap detayı için belki başka alanlar da ekleyebilirsiniz
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
  totalItems: number;
};

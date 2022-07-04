export type Book = {
  url: string;
  name: string;
  isbn: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  mediaType: string;
  released: Date;
  characters: string[];
  povCharacters: string[];
};

export type Character = {
  url: string;
  name: string;//+
  culture: string;
  born: string;//+
  died: string;//+
  titles: any[];//+
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];//+
  povBooks: any[];
  tvSeries: string[];
  playedBy: string[];
  gender:string//+
}



/** Upload representation in strapi api */
export type Upload = {
  id?: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: Upload;
    small?: Upload;
    medium?: Upload;
    large?: Upload;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  createdAt?: string;
  updatedAt?: string;
};

/** Type représentant un utilisateur dans le backend */
export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  balance: number;
  createdAt: string;
  updatedAt: string;
  avatar?: Upload;
};

/** Type représentant un produit dans le backend */
export type Product = {
  id: 1;
  attributes: {
    name: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
    barcode: null | string;
    image: {
      data: {
        id: number;
        attributes: Upload;
      };
    };
  };
};

/** Type représentant un historique dans le backend */
export type History = {
  id: number;
  attributes: {
    description: string;
    movement: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
    date: string;
    product: {
      data: Product;
    };
  };
};

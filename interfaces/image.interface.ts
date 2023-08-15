export interface ImageItem {
  data: { id: number; attributes: { url: string } };
}

export interface ImageItems {
  data: { id: number; attributes: { url: string } }[];
}

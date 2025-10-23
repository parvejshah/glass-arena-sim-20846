export interface Gallery {
  id: string;
  name: string;
  blocks: string[];
  levels: string[];
  price: number;
  svgPathIds: {
    [level: string]: string[];
  };
}

export interface Selection {
  galleryId: string;
  level: string;
  block: string;
  tickets: number;
  ticketHolderName: string;
  phone: string;
}

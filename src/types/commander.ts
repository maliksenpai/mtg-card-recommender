export type MagicCard = {
  name: string;
  image_uris: ImageObject;
  id: string;
  colors: string[];
  oracle_text: string;
  type_line: string;
  explanation?: string;
};

export type ImageObject = {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
};

export type AiCardResponse = {
  name: string;
  explanation: string;
};

export type FilterType = {
  cardColor?: string[];
  cardType?: string;
  cardAggresive?: AggresiveType;
};

export enum AggresiveType {
  Control = "Control",
  Aggresive = "Aggresive",
  Combo = "Combo",
  MidRange = "Mid Range",
}

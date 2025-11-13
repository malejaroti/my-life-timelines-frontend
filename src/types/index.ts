export type SelectOption = { 
    value: string, 
    label: string,
    id?: string // to store existing tag id if available and facilitate the mapping
};

export interface ITag {
  _id: string;
  name: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
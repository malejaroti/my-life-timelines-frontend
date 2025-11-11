export type SelectOption = { 
    value: string, 
    label: string,
    _id?: string
};

export interface ITag {
  _id: string;
  name: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
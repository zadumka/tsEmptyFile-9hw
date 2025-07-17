export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: Tag;
}

export interface NewNoteContent {
  title: string;
  content?: string;
  tag: Tag;
}

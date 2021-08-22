export interface QuestionI {
  _id?: string;
  text: string;
  gender: string;
  type: string;
  author: string;
  state: boolean;
  counter: number;
  reports: number;
  created?: string;
  updated?: string;
  id?: string;
}

import { ISentence } from './sentence-with-input';

export interface IExercise {
  owner: string[] | string;
  skill: 'grammar' | 'vocabulary';
  type: 'fillInGaps' | 'multipleChoice';
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  sentenceList: ISentence[];
  title?: string;
  taskDescription?: string;
  studentLevel?: string;
  studentAge?: number;
}

export interface IExerciseCreate {
  type: string;
  skill: string;
  sentenceList: ISentence[];
}

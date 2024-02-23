import { ISentence } from "../interfaces/sentence-with-input";

export const sampleDataSelect: ISentence[] = [
  {
    sentence: 'I need to arrange a meeting with my colleagues.',
    answer: 'arrange',
    hint: 'arrange',
    options: ['arrange', 'organize', 'allocate'],
  },
  {
    sentence: 'She always complains about the traffic in the city.',
    answer: 'complain',
    hint: 'complain',
    options: ['complain', 'grumble', 'protest'],
  },
  {
    sentence: "I'm fed up with this constant noise from the construction site.",
    answer: 'fed up',
    hint: 'fed up',
    options: ['fed up', 'annoyed', 'irritated'],
  },
  {
    sentence: 'I would like to book a table for two at the restaurant.',
    answer: 'book',
    hint: 'book',
    options: ['book', 'reserve', 'schedule'],
  },
  {
    sentence: 'They decided to hire a new employee for the vacant position.',
    answer: 'hire',
    hint: 'hire',
    options: ['hire', 'recruit', 'employ'],
  },
];

/* Shared shapes for the four respondent instruments.
   type: single | multi | scale | text ; optional:true removes the required check. */

export type TrackKey = "native" | "surveyor" | "realtor" | "official";

type QuestionBase = {
  id: string;
  prompt: string;
  hint?: string;
  optional?: boolean;
};

export type ChoiceQuestion = QuestionBase & {
  type: "single" | "multi";
  options: string[];
};

export type ScaleQuestion = QuestionBase & {
  type: "scale";
  labels: [string, string];
};

export type TextQuestion = QuestionBase & {
  type: "text";
};

export type Question = ChoiceQuestion | ScaleQuestion | TextQuestion;

export type Track = {
  label: string;
  title: string;
  color: string;
  sub: string;
  questions: Question[];
};

/** A single answer: string for single/text, number for scale, string[] for multi. */
export type AnswerValue = string | number | string[];
export type Answers = Record<string, AnswerValue>;

/** Rows from the public read-only aggregate views. */
export type TrackTotal = { track: string; total_responses: number };
export type OptionCount = {
  track: string;
  question_id: string;
  answer_value: string;
  responses: number;
};

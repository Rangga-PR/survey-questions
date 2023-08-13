export const RULES = {
  "MUST-SELECT": "Must Select",
  "MAY-SELECT": "May Select",
} as const;

export type Rule = (typeof RULES)[keyof typeof RULES];

export interface RespondentOption {
  answer: string;
  rule: Rule;
}

export interface Question {
  id: number;
  question: string;
  options: RespondentOption[];
}

export type QuestionFormValue = Pick<Question, "question" | "options">;

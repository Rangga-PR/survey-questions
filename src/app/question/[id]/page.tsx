"use client";

import React from "react";
import QuestionForm from "@/components/QuestionForm";
import { Question, type QuestionFormValue } from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

function ViewQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = parseInt(params.id);
  const [localQuestions, setLocalQuestions] = useLocalStorage(
    "localQuestion",
    "[]"
  );

  const handleSubmit = (value: QuestionFormValue) => {
    setLocalQuestions([
      ...localQuestions.filter((question: Question) => question.id !== id),
      { id, ...value },
    ]);
    router.push("/");
  };

  return (
    <QuestionForm onSubmit={handleSubmit} value={localQuestions[params.id]} />
  );
}

export default ViewQuestionPage;

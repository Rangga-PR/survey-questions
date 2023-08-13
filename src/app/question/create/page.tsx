"use client";

import QuestionForm from "@/components/QuestionForm";
import React from "react";
import { type QuestionFormValue } from "@/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

function CreateQuestionPage() {
  const router = useRouter();
  const [localQuestions, setLocalQuestions] = useLocalStorage(
    "localQuestion",
    "[]"
  );

  const handleSubmit = (value: QuestionFormValue) => {
    const id = localQuestions?.length || 0;
    setLocalQuestions([...localQuestions, { id, ...value }]);
    router.push("/");
  };

  return <QuestionForm onSubmit={handleSubmit} />;
}

export default CreateQuestionPage;

"use client";

import QuestionList from "@/components/QuestionList/QuestionList";
import useLocalStorage from "@/hooks/useLocalStorage";
import { type Question } from "@/types";
import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const [localQuestions, setLocalQuestions] = useLocalStorage(
    "localQuestion",
    "[]"
  );

  const deleteQuestion = (id: number) => {
    const newQuestions = localQuestions.filter(
      (question: Question) => question.id !== id
    );
    setLocalQuestions(newQuestions);
  };

  return (
    <main>
      <Grid container justifyContent="end">
        <Link href="/question/create">
          <Button variant="contained" sx={{ mb: "2em" }} startIcon={<Add />}>
            Add Question
          </Button>
        </Link>
      </Grid>
      <QuestionList
        questions={localQuestions}
        setQuestions={setLocalQuestions}
        handleDelete={deleteQuestion}
      />
    </main>
  );
}

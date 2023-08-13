"use client";

import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import {
  FormControl,
  TextField,
  MenuItem,
  FormGroup,
  Grid,
  FormLabel,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { RULES, type QuestionFormValue } from "@/types";
import Link from "next/link";

const inputLabelProps = { shrink: true };

const defaultFormValue = {
  question: "",
  options: [{ rule: RULES["MAY-SELECT"], answer: "" }],
};

interface QuestionFormProps {
  value?: QuestionFormValue;
  onSubmit: (value: QuestionFormValue) => void;
}

type TextFieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function QuestionForm({
  value = defaultFormValue,
  onSubmit,
}: QuestionFormProps) {
  const [formValue, setFormValue] = useState(value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValue);
  };

  const handleAddOption = () => {
    setFormValue((prev) => ({
      ...prev,
      options: [...prev.options, { rule: RULES["MAY-SELECT"], answer: "" }],
    }));
  };

  const handleQuestionChange = (e: TextFieldChangeEvent) => {
    setFormValue((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const handleAnswerChange = (e: TextFieldChangeEvent, idx: number) => {
    setFormValue((prev) => ({
      ...prev,
      options: prev.options.map((option: any, optionIdx: number) => {
        if (idx === optionIdx) return { ...option, answer: e.target.value };
        return option;
      }),
    }));
  };

  const handleRuleChange = (e: TextFieldChangeEvent, idx: number) => {
    setFormValue((prev) => ({
      ...prev,
      options: prev.options.map((option: any, optionIdx: number) => {
        if (idx === optionIdx) return { ...option, rule: e.target.value };
        return option;
      }),
    }));
  };

  return (
    <form name="question-form" onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ marginBottom: "2em" }}>
        <TextField
          id="question"
          name="question"
          label="Question"
          value={formValue.question}
          onChange={handleQuestionChange}
          InputLabelProps={inputLabelProps}
        />
      </FormControl>

      <FormGroup>
        <FormLabel id="respondent-options-label" sx={{ marginBottom: "1em" }}>
          Respondent Options
        </FormLabel>

        <Grid container rowSpacing={3} columnSpacing={2}>
          {formValue.options.map((option, idx) => (
            <Fragment key={idx}>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    id="rule"
                    label="Rule"
                    name="rule"
                    select
                    value={option.rule}
                    onChange={(e) => handleRuleChange(e, idx)}
                  >
                    <MenuItem value={RULES["MAY-SELECT"]}>
                      {RULES["MAY-SELECT"]}
                    </MenuItem>
                    <MenuItem value={RULES["MUST-SELECT"]}>
                      {RULES["MUST-SELECT"]}
                    </MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <TextField
                    id="answer"
                    label="Answer"
                    name="answer"
                    value={option.answer}
                    onChange={(e) => handleAnswerChange(e, idx)}
                    InputLabelProps={inputLabelProps}
                  />
                </FormControl>
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <Button
          startIcon={<Add />}
          sx={{ width: "fit-content", marginY: "1em" }}
          onClick={handleAddOption}
        >
          Add Option
        </Button>
      </FormGroup>

      <Grid container spacing={1}>
        <Grid item>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Grid>
        <Grid item>
          <Link href="/">
            <Button variant="outlined">Cancel</Button>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default QuestionForm;

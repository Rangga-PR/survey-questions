import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { type Question } from "@/types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";
import QuestionAction from "./QuestionAction";
import QuestionOptions from "./QuestionOptions";
import { Typography } from "@mui/material";

const reorder = (list: Question[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface QuestionListProp {
  questions: Question[];
  setQuestions: (question: Question[]) => void;
  handleDelete: (id: number) => void;
}

function QuestionList({
  questions,
  setQuestions,
  handleDelete,
}: QuestionListProp) {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newQuestions = reorder(
      questions,
      result.source.index,
      result.destination.index
    );

    setQuestions(newQuestions);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Option</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <Droppable droppableId="question-list">
            {(provided) => (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map(({ id, question, options }, idx) => (
                  <Draggable
                    key={`${idx}-${question}`}
                    draggableId={`${idx}-${question}`}
                    index={idx}
                  >
                    {(provided) => (
                      <TableRow
                        sx={{
                          ...provided.draggableProps.style,
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TableCell width="50%">{question}</TableCell>
                        <TableCell width="50%">
                          <QuestionOptions options={options} />
                        </TableCell>
                        <TableCell width="50%">
                          <QuestionAction id={id} handleDelete={handleDelete} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {questions?.length <= 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography align="center">Question not found</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </TableContainer>
    </DragDropContext>
  );
}

export default QuestionList;

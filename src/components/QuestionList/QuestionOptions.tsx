import { type RespondentOption } from "@/types";
import { Button, List, ListItem, ListItemText, Menu } from "@mui/material";
import React, { useState, MouseEvent } from "react";

interface QuestionOptionsProps {
  options: RespondentOption[];
}

function QuestionOptions({ options }: QuestionOptionsProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <Button onClick={handleOpen}>See Option</Button>
      <Menu
        onClose={handleClose}
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
      >
        <List>
          {options.map(({ answer, rule }, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={answer} secondary={rule} />
            </ListItem>
          ))}
        </List>
      </Menu>
    </>
  );
}

export default QuestionOptions;

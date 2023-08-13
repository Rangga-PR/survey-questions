import React, { useState, MouseEvent } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";

interface QuestionActionProps {
  id: number;
  handleDelete: (id: number) => void;
}

function QuestionAction({ id, handleDelete }: QuestionActionProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton
        onClick={(event: MouseEvent<HTMLButtonElement>) =>
          setMenuAnchor(event.currentTarget)
        }
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
        <Link href={`/question/${id}`}>
          <MenuItem>View</MenuItem>
        </Link>
      </Menu>
    </>
  );
}

export default QuestionAction;

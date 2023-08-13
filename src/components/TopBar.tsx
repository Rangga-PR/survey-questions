import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function TopBar() {
  return (
    <AppBar position="sticky" sx={{ alignItems: "center" }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Survey Questions
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

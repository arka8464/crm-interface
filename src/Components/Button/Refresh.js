import React from "react";
import { Button, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          backgroundColor: "#fc7500",
          boxShadow: "none",
          fontSize: "0.8rem",
          border: "none",
          "&.Mui-disabled": {
            color: "white",
            opacity: 0.7,
            border: "none",
          },
          "&:hover": {
            backgroundColor: "#fc7500",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              borderBottom: "3px solid white",
            },
          },
        },
      },
    },
  },
});

export default function Refresh(props) {
  const { setSearchedData } = props;

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        style={{ height: "37px", marginRight: "10px" }}
        onClick={() => setSearchedData([])}
      >
        Refresh Data
      </Button>
    </ThemeProvider>
  );
}

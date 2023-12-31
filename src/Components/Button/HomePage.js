import React from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          boxShadow: "none",
          fontSize: "0.8rem",
          border: "none",
          "&.Mui-disabled": {
            color: "white",
            opacity: 0.7,
            border: "none"
          },
          "&:hover": {
            backgroundColor: "none",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              borderBottom: "3px solid white",
            }
          }
        }
      }
    }
  }
});

export default function HomePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        style={{
          height: "37px",
          marginRight: "10px",
          color: "white",
          boxShadow: "none",
          fontSize: "0.8rem",
          border: "none",
        }}
        onClick={handleRefresh}
      >
        Home Page
      </Button>
    </ThemeProvider>
  );
}

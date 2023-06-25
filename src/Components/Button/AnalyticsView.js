import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DialogChart from "../Chart/Dialog";
const queryString = require("query-string");

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
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          backgroundColor: "white",
          borderRadius: "none",
          "&:after": {
            borderBottom: "2px solid white",
            backgroundColor: "white",
            color: "white"
          }
        }
      }
    }
  }
});

export default function AnalyticsView() {
  const [open, setOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [newData, setNewData] = useState({
    clear_date_from: "",
    clear_date_to: "",
    due_date_from: "",
    due_date_to: "",
    baseline_create_date_from: "",
    baseline_create_date_to: "",
    invoice_currency: "",
  });
  const [chart, setChart] = useState({
    businessCode:"",
    customerNumber:"",
    totalAmount:"",
    invoice:"",
    count:""
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setNewData({ ...newData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewData({
      ...newData,
      clear_date_from: "",
      clear_date_to: "",
      due_date_from: "",
      due_date_to: "",
      baseline_create_date_from: "",
      baseline_create_date_to: "",
      invoice_currency: "",
    });
  };

  const handleAnalytics = async (e) => {
    e.preventDefault();
    const {
      clear_date_from,
      clear_date_to,
      due_date_from,
      due_date_to,
      baseline_create_date_from,
      baseline_create_date_to,
      invoice_currency,
    } = newData;
    await axios
      .post(
        "http://localhost:8080/JDBC/analytics",
        queryString.stringify({
          clear_date_from,
          clear_date_to,
          due_date_from,
          due_date_to,
          baseline_create_date_from,
          baseline_create_date_to,
          invoice_currency,
        })
      )
      .then((res) => {
        setOpen(false);        
        setChart({
          businessCode:res.data.business.map(item=>item.BusinessCode),
          customerNumber:res.data.business.map(item=>item.NumberOfCust),
          totalAmount:res.data.business.map(item=>item.TotalAmount),
          invoice:res.data.count.map(item=>item.Invoice),
          count:res.data.count.map(item=>item.Count)
        })
        setNewData({
          ...newData,
          clear_date_from: "",
          clear_date_to: "",
          due_date_from: "",
          due_date_to: "",
          baseline_create_date_from: "",
          baseline_create_date_to: "",
          invoice_currency: "",
        });
        setChartOpen(true);
      })
      .catch((err) => {
        setOpen(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
        ANALYTICS VIEW
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle style={{ backgroundColor: "# #666767", color: "white" }}>
          Analytics View
        </DialogTitle>
        <DialogContent style={{ paddingTop: 20, backgroundColor: "#666767" }}>
          <DialogContentText component={"div"}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={6}>
                <Typography style={{ color: "white" }}>
                  Distribution Channel
                </Typography>
                <TextField
                  label="Invoice Currency"
                  variant="filled"
                  fullWidth
                  name="distribution_channel"
                  value={newData.distribution_channel}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography style={{ color: "white" }}>
                  Customer Number
                </Typography>
                <TextField
                  label="Customer Number"
                  variant="filled"
                  fullWidth
                  name="customer_number"
                  value={newData.customer_number}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#666767" }}>
          <Button
            onClick={handleAnalytics}
            fullWidth
            variant="outline"
            style={{
              border: "1px solid white",
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            SUBMIT
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            fullWidth
            variant="outline"
            style={{ border: "1px solid white", borderRadius: 5 }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <DialogChart open={chartOpen} setOpen={setChartOpen} chart={chart} />
    </ThemeProvider>
  );
}

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
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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



export default function Add(props) {
  const {setSnackopen, setStatus, setRefresh, refresh, setSelect} = props;
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({
    business_code: "",
    cust_number: "",
    clear_date: "",
    buisness_year: "",
    doc_id: "",
    posting_date: "",
    document_create_date: "",
    due_in_date: "",
    invoice_currency: "",
    document_type: "",
    posting_id: "",
    total_open_amount: "",
    baseline_create_date: "",
    cust_payment_terms: "",
    invoice_id: "",
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
      business_code: "",
      cust_number: "",
      clear_date: "",
      buisness_year: "",
      doc_id: "",
      posting_date: "",
      document_create_date: "",
      due_in_date: "",
      invoice_currency: "",
      document_type: "",
      posting_id: "",
      total_open_amount: "",
      baseline_create_date: "",
      cust_payment_terms: "",
      invoice_id: "",
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const {
      business_code,
      cust_number,
      clear_date,
      buisness_year,
      doc_id,
      posting_date,
      document_create_date,
      due_in_date,
      invoice_currency,
      document_type,
      posting_id,
      total_open_amount,
      baseline_create_date,
      cust_payment_terms,
      invoice_id,
    } = newData;
    await axios
      .post(
        "http://localhost:8080/JDBC/insert",
        queryString.stringify({
          business_code,
          cust_number,
          clear_date,
          buisness_year,
          doc_id,
          posting_date,
          document_create_date,
          due_in_date,
          invoice_currency,
          document_type,
          posting_id,
          total_open_amount,
          baseline_create_date,
          cust_payment_terms,
          invoice_id,
        })
      )
      .then((res) => {
        setStatus(res.data);
        setOpen(false);
        setSnackopen(true);
        setNewData({
          ...newData,
          business_code: "",
          cust_number: "",
          clear_date: "",
          buisness_year: "",
          doc_id: "",
          posting_date: "",
          document_create_date: "",
          due_in_date: "",
          invoice_currency: "",
          document_type: "",
          posting_id: "",
          total_open_amount: "",
          baseline_create_date: "",
          cust_payment_terms: "",
          invoice_id: "",
        });
        setRefresh(refresh+1);
        setSelect([]);
      })
      .catch((err) => {
        setSnackopen(true);
        setStatus(err);
        setOpen(false);
        setRefresh(refresh+1);
        setSelect([]);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
      >
        ADD
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" >
        <DialogTitle style={{backgroundColor:"#666767", color:"white" }}>Add</DialogTitle>
        <DialogContent style={{ paddingTop: 10, backgroundColor:"#a9a9a9" }}>
          <DialogContentText component={'div'}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="CUSTOMER ORDER ID"
                  variant="filled"
                  fullWidth
                  name="order_id"
                  value={newData.order_id}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="SALES ORG"
                  variant="filled"
                  fullWidth
                  name="sales_org"
                  value={newData.sales_org}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Distribution Channel"
                  variant="filled"
                  fullWidth
                  name="distribution_channel"
                  value={newData.distribution_channel}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="CUSTOMER NUMBER"
                  variant="filled"
                  fullWidth
                  name="customer_number"
                  value={newData.customer_number}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="COMPANY CODE"
                  variant="filled"
                  fullWidth
                  name="comapany_code"
                  value={newData.comapany_code}
                  onChange={handleChange}
                  InputLabelProps={{  required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="ORDER CURRENCY"
                  variant="filled"
                  fullWidth
                  name="order_currency"
                  value={newData.order_currency}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="ORDER CREATION DATE"
                  variant="filled"
                  fullWidth
                  name="creation_data"
                  value={newData.creation_data}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{backgroundColor:"#2A3E4C"}}>
        <Tooltip title="You have to filled all the Information">
          <span style={{width:"100%" ,marginRight:10}}>
          <Button
            onClick={handleAdd}
            fullWidth
            variant="outline"
            disabled={
              newData.business_code === "" ||
              newData.invoice_id === "" ||
              newData.cust_payment_terms === "" ||
              newData.baseline_create_date === "" ||
              newData.total_open_amount === "" ||
              newData.posting_id === "" ||
              newData.document_type === "" ||
              newData.invoice_currency === "" ||
              newData.due_in_date === "" ||
              newData.document_create_date === "" ||
              newData.posting_date === "" ||
              newData.doc_id === "" ||
              newData.clear_date === "" ||
              newData.buisness_year === "" ||
              newData.cust_number === ""
                ? true 
                : false
            }
            style={{border:"1px solid white"}}
          >
            ADD
          </Button>
          </span>
          </Tooltip>
          <Button onClick={handleClose} fullWidth variant="outline" style={{border:"1px solid white"}}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

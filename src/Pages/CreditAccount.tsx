import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { changePage } from "../Model/ApplicationSlice";
import { changeUserBalance, getToken } from "../Model/UserSlice";

const CreditAccount = () => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(1);
  const token = useSelector(getToken)

  const credit = (amount: number) => {
    axios
      .post(
        "http://localhost:1337/api/credit",
        {
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        //TODO: Ajouter un toast pour le feedback
        dispatch(changeUserBalance(amount));
        dispatch(changePage("mainMenu"));
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "16px",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          label="Nombre"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{ type: "number", inputProps: { min: 1 } }}
          value={amount}
          onChange={(evt) => {
            setAmount(Number(evt.currentTarget.value));
          }}
        />
        <Button onClick={() => credit(amount)} variant="contained">
          Recharger
        </Button>
      </Box>
    </Box>
  );
};

export default CreditAccount;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { History } from "../Model/types";
import { getPersonalHistory, setPersonalHistory } from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";

const HistoryPanel = () => {
  const dispatch = useAppDispatch();
  const history = useSelector(getPersonalHistory);

  //TODO: Gérer la pagination -> Pour le moment on récupère les 25 dernières entrées

  useEffect(() => {
    if (history == undefined) {
      sendApiRequest({
        url: `/history/myHistory`,
      }).then((response) => {
        const data: History[] = response?.data.data;
        dispatch(
          setPersonalHistory(
            data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
          )
        );
      });
    }
  }, [history]);

  return (
    <Box>
      {/** La taille du tableau a été mit a la zob, trouver un moyen de lui faire prendre toute la hauteur */}
      <TableContainer sx={{ height: "92vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Mouvement</TableCell>
              <TableCell>Produit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history?.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {entry.description}
                </TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.movement}</TableCell>
                <TableCell>{entry.Product?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryPanel;

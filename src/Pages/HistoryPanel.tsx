import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { History } from "../Model/types";
import {
  getAuthenticatedUser,
  getPersonalHistory,
  setAuthenticatedUser,
  setPersonalHistory,
} from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";

const HistoryPanel = () => {
  const dispatch = useAppDispatch();
  const history = useSelector(getPersonalHistory);
  const user = useSelector(getAuthenticatedUser);

  //TODO: Gérer la pagination -> Pour le moment on récupère les 25 dernières entrées

  useEffect(() => {
    if (history == undefined) {
      sendApiRequest({
        url: `/histories?populate=product&filters[user][id][$eq]=${user?.id}`,
      }).then((response) => {
        const data: History[] = response?.data.data;
        dispatch(
          setPersonalHistory(
            data.sort(
              (a, b) =>
                new Date(b.attributes.createdAt).getTime() -
                new Date(a.attributes.createdAt).getTime()
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
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {entry.attributes.description}
                </TableCell>
                <TableCell>{entry.attributes.createdAt}</TableCell>
                <TableCell>{entry.attributes.movement}</TableCell>
                <TableCell>
                  {entry.attributes.product?.data?.attributes?.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryPanel;

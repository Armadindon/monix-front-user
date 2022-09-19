import { Avatar, Button, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import { useAppDispatch } from "../hook";
import {
  getAuthenticatedUser,
  getToken,
  setAuthenticatedUser,
} from "../Model/UserSlice";
import { ReactComponent as MonixCoin } from "./../assets/monixcoin.svg";

const MainPanel = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getAuthenticatedUser);

  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:1337/api/users/me?populate=avatar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => dispatch(setAuthenticatedUser(data)));
    }
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
          marginTop: "16px",
        }}
      >
        <Typography variant="h5">
          {!user ? <Skeleton /> : `Bienvenue ${user.username} !`}
        </Typography>
        {!user ? (
          <Skeleton variant="circular" width={160} height={160}>
            <Avatar sx={{ width: 64, height: 64 }} />
          </Skeleton>
        ) : (
          <Avatar
            sx={{ width: 64, height: 64 }}
            src={`http://localhost:1337${user.avatar?.url}`}
          />
        )}
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
          {!user ? (
            <Skeleton />
          ) : (
            <>
              Tu as {user.balance}
              <MonixCoin style={{ marginLeft: ".25em" }} />
            </>
          )}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "50vh",
            justifyContent: "space-evenly"
          }}
        >
          <Button variant="contained">Acheter un produit</Button>
          <Button variant="contained">Recharger mes crédits</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainPanel;

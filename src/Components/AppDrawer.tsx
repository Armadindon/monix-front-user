import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import PasswordIcon from "@mui/icons-material/Password";
import {
  addSnackbarMessage,
  changePage,
  isDrawerOpened,
  switchDrawer,
} from "../Model/ApplicationSlice";
import { clearToken } from "../Model/UserSlice";
import { clearTokenFromLocalStorage } from "../Model/tokenManager";

const AppDrawer = () => {
  const dispatch = useDispatch();
  const drawerOpened = useSelector(isDrawerOpened);

  return (
    <Drawer open={drawerOpened} onClose={() => dispatch(switchDrawer())}>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(changePage("editAccount"));
              dispatch(switchDrawer());
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Modifier mon profil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(switchDrawer());
              dispatch(changePage("historyPanel"));
            }}
          >
            <ListItemIcon>
              <AlignHorizontalLeftIcon />
            </ListItemIcon>
            <ListItemText primary="Historique" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(switchDrawer());
              dispatch(changePage("changePassword"));
            }}
          >
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary="Modifier son mot de passe" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(clearToken());
              clearTokenFromLocalStorage();
              dispatch(switchDrawer());
              dispatch(changePage("login"));
              dispatch(
                addSnackbarMessage({
                  message: "Deconnecté ! 🏃",
                  options: { variant: "default" },
                })
              );
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Se deconnecter" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;

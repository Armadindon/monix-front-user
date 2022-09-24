import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "../hook";
import { changePage, switchDrawer } from "../Model/ApplicationSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(switchDrawer())}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="a"
            href="#"
            onClick={() => {
              dispatch(changePage("mainMenu"));
              dispatch(switchDrawer());
            }}
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Monix 2.0
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Monix 2.0
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

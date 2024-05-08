import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component={"nav"}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Link>
          {isAdminRoute && (
            <>
              <Link
                to="/admin/stone"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginRight: 2,
                }}
                className="!mr-4"
              >
                <Typography variant="body1" component="div">
                  Stones
                </Typography>
              </Link>
              <Link
                to="/admin/symbol"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body1" component="div">
                  Symbols
                </Typography>
              </Link>
            </>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Design Grave Stone
          </Typography>
          {isAdminRoute && (
            <>
              <Link
                to="/admin/stone"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginRight: 2,
                  visibility: "hidden",
                }}
                className="!mr-4"
              >
                <Typography variant="body1" component="div">
                  Stones
                </Typography>
              </Link>
              <Link
                to="/admin/symbol"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  visibility: "hidden",
                }}
              >
                <Typography variant="body1" component="div">
                  Symbols
                </Typography>
              </Link>
            </>
          )}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ visibility: "hidden" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

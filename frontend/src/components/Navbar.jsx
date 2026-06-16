import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleCloseUserMenu();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#151717" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AssignmentTurnedInIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate(token ? "/todo-list" : "/login")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            TODOAPP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {!token ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/login");
                    }}
                  >
                    <Typography>Login</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/register");
                    }}
                  >
                    <Typography>Register</Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/todo-list");
                  }}
                >
                  <Typography>My Tasks</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <AssignmentTurnedInIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={() => navigate(token ? "/todo-list" : "/login")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "inherit",
              cursor: "pointer",
            }}
          >
            TODOAPP
          </Typography>

          {/* Кнопки навигации для десктопа */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!token ? (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ my: 2, color: "white" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  sx={{ my: 2, color: "white" }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/todo-list")}
                sx={{ my: 2, color: "white" }}
              >
                My Tasks
              </Button>
            )}
          </Box>
          {token && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" sx={{ bgcolor: "#4f46e5" }}>
                    U
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center", color: "#ff4d4f" }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

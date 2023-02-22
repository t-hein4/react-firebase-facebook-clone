import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../data/routes";

function Nav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleChangeNavigate = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    ref.current.ownerDocument.documentElement.scrollTop = 0;
  }, [navigate, value]);

  return (
    <Box ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChangeNavigate}
        >
          {routes.map(({ label, icon, id, path }, index) => (
            <BottomNavigationAction
              key={id}
              label={label}
              icon={icon}
              arial-label={label}
              value={index}
              component={Link}
              to={`${path}`}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Nav;

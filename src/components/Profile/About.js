import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import about from "../../data/about";
import EditPublicDetails from "../Buttons/EditPublicDetails";

function About() {
  return (
    <>
      <List dense disablePadding>
        {about.map(({ name, icon, id }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <EditPublicDetails />
    </>
  );
}

export default About;

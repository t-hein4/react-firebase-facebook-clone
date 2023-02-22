import { Stack, Card, CardHeader, Typography } from "@mui/material";
import MenuButtons from "./MenuButtons";
import SimpleAccordion from "./SimpleAccordion";
import { accordionList } from "../../menuBntList";
import Logout from "../Buttons/Logout";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BaseAvatar from "../Base/BaseAvatar";

const Menu = () => {
  const context = useAuthContext();
  const navigate = useNavigate();
  return (
    <Stack p={1}>
      <Card square elevation={0} sx={{ bgcolor: "transparent" }}>
        <CardHeader
          onClick={() => navigate("/profile")}
          avatar={
            <BaseAvatar
              photoURL={context.user.photoURL}
              displayName={context.user.displayName}
            />
          }
          title={
            <Typography variant="h5">{context.user.displayName}</Typography>
          }
          subheader={<Typography variant="body2">See your profile</Typography>}
        />
      </Card>
      <MenuButtons />
      {accordionList.map(({ summary, details }, index) => (
        <SimpleAccordion
          summary={summary}
          details={details}
          index={index}
          key={summary.id}
        />
      ))}

      <Logout />
    </Stack>
  );
};

export default Menu;

import { Avatar, AvatarGroup } from "@mui/material";

function Reaction() {
  return (
    <AvatarGroup max={3} spacing={7}>
      {Array.from({ length: 3 }).map((element, i) => (
        <Avatar
          key={i}
          alt="like emoji"
          src={process.env.PUBLIC_URL + "./images/happy.png"}
          sx={{ width: 22, height: 22, color: "yellow" }}
        />
      ))}
    </AvatarGroup>
  );
}

export default Reaction;

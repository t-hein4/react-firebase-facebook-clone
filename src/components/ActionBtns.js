import Button from "@mui/material/Button";

function ActionBtns({ actions, color, userId, postId, like, setLike }) {
  return (
    <>
      {actions.map(({ name, icon, onClick }) => (
        <Button
          onClick={() => {
            onClick(userId, postId);
            setLike(true);
          }}
          key={name}
          sx={{
            color: like ? "blue" : color,
            width: "100%",
            textTransform: "capitalize",
          }}
          size="small"
          startIcon={icon}
          endIcon={name}
        />
      ))}
    </>
  );
}

export default ActionBtns;

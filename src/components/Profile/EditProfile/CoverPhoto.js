import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import { Box, Typography, Stack, Button } from "@mui/material";
import DrawerBtn from "../../Buttons/DrawerBtn";
import SelectPhotoDrawer from "../../Drawers/SelectPhotoDrawer";

function CoverPhoto() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Typography variant="h3">Cover Photo</Typography>
        <DrawerBtn
          anchor={"bottom"}
          button={(toggleDrawer) => (
            <Button size="small" onClick={() => toggleDrawer(true)}>
              Add
            </Button>
          )}
          drawer={(toggleDrawer) => (
            <SelectPhotoDrawer toggleDrawer={() => toggleDrawer(false)} />
          )}
        />
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "250px",
          bgcolor: "rgb(190, 190, 190)",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PhotoSizeSelectActualOutlinedIcon
          sx={{ color: "white", fontSize: "20px" }}
        />
      </Box>
    </>
  );
}

export default CoverPhoto;

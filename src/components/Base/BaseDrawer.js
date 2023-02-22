import { Divider, Stack } from "@mui/material";
import PropTypes from "prop-types";

const BaseDrawer = (props) => {
  const { header, body } = props;

  return (
    <Stack divider={<Divider />}>
      <Stack
        direction="row"
        alignItems="center"
        px={1}
        justifyContent="space-between"
      >
        {header}
      </Stack>
      <Stack
        m="0 auto"
        p={1}
        spacing={1}
        width={{ xs: "90%", md: "50%" }}
        divider={<Divider />}
      >
        {body}
      </Stack>
    </Stack>
  );
};

BaseDrawer.propTypes = {
  header: PropTypes.element.isRequired,
  body: PropTypes.element.isRequired,
};

export default BaseDrawer;

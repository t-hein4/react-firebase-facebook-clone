import { Skeleton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import Time from "./Time";
import Type from "./Type";
import BaseDot from "./Base/BaseDot";

function TimeType(props) {
  const { timestamp, type, loading } = props;
  return (
    <>
      {loading ? (
        <Skeleton height={10} width="20%" />
      ) : (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          fontSize="0.75rem"
        >
          {timestamp && <Time timestamp={timestamp} />}
          <BaseDot />
          {type && <Type type={type} />}
        </Stack>
      )}
    </>
  );
}

TimeType.propTypes = {
  timestamp: PropTypes.object,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

export default TimeType;

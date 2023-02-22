import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";
import { forwardRef } from "react";
import { FormHelperText } from "@mui/material";

const RadioButtons = forwardRef((props, ref) => {
  const { control, errors } = props;

  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <FormControl
          fullWidth
          sx={{ m: 1 }}
          variant="outlined"
          error={!!errors.gender}
        >
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup aria-labelledby="gender" name="gender" {...field}>
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              labelPlacement="start"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              labelPlacement="start"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            />
            <FormControlLabel
              value="others"
              control={<Radio />}
              label="Others"
              labelPlacement="start"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            />
          </RadioGroup>
          {!!errors.gender && (
            <FormHelperText id="my-helper-text">
              {errors.gender.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
});

export default RadioButtons;

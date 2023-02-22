import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { FormControl, TextField } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { forwardRef } from "react";

const DatePicker = forwardRef((props, ref) => {
  const { control, errors, setValue, getValues } = props;

  const handleChange = (newValue) => {
    setValue("dob", newValue);
  };

  return (
    <Controller
      name="dob"
      control={control}
      render={({ field }) => (
        <FormControl fullWidth sx={{ m: 1 }} error={!!errors.dob}>
          <FormLabel component="legend">Date of Birth</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              value={getValues("dob")}
              onChange={handleChange}
              inputFormat="MM/dd/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  error={!!errors.dob}
                  helperText={!!errors.dob && errors.dob.message}
                />
              )}
            />
          </LocalizationProvider>
        </FormControl>
      )}
    />
  );
});

export default DatePicker;

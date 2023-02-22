import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { forwardRef } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Controller } from "react-hook-form";

const InputWithClearBtn = forwardRef((props, ref) => {
  const { name, placeholder, errors, type, control, resetField, getValues } =
    props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          fullWidth
          variant="outlined"
          {...field}
          type={type}
          placeholder={placeholder}
          error={!!errors[name]}
          helperText={!!errors[name] && errors[name].message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear input"
                    onClick={() => resetField(name)}
                    edge="end"
                  >
                    {getValues(name) && <HighlightOffIcon />}
                  </IconButton>
                </InputAdornment>
              </InputAdornment>
            ),
          }}
          inputProps={{
            "aria-label": "last name",
          }}
        />
      )}
    />
  );
});

export default InputWithClearBtn;

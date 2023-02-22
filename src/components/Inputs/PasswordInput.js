import { useState, forwardRef } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller } from "react-hook-form";

const PasswordInput = forwardRef((props, ref) => {
  const { errors, control } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type={showPassword ? "text" : "password"}
          variant="outlined"
          placeholder="Password"
          error={!!errors.password}
          helperText={!!errors.password && errors.password.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
});

export default PasswordInput;

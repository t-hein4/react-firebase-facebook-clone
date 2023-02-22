import {
  Button,
  Stack,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";

import PasswordInput from "../components/Inputs/PasswordInput.js";
import { useAuthContextUpdater } from "../context/AuthContext.js";
import { useLocation, useNavigate } from "react-router-dom";
import useErrorHandler from "../hooks/useErrorHandler";
import { useForm } from "react-hook-form";
import InputWithClearBtn from "../components/Inputs/InputWithClearBtn.js";
import { useState } from "react";
import Loading from "./Loading.js";

const defaultValues = {
  email: "test.user1@gmail.com",
  password: "12345678",
};

function SignIn() {
  const [loading, setLoading] = useState(false);
  const errorContext = useErrorHandler();
  const navigate = useNavigate();
  const location = useLocation();
  const validator = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    resetField,
    register,
    getValues,
    formState: { errors },
  } = validator;

  let from = location.state?.from?.pathname || "/";

  const context = useAuthContextUpdater();

  const onSubmit = async (user) => {
    try {
      setLoading(true);
      await context.handleSignIn(user);
      navigate(from, { replace: true });
    } catch (error) {
      errorContext.setError("error", error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Stack
      component={"form"}
      id="sign-in-form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      mx="auto"
      my={10}
      alignItems="center"
      width={{ sm: "50%", md: "40%", lg: "30%" }}
      noValidate
    >
      {loading ? (
        <Loading>
          <Typography mb={10} color="primary" variant="h3">
            Loading
          </Typography>
          <CircularProgress />
          <Typography variant="body2">Please wait</Typography>
        </Loading>
      ) : (
        <>
          <Typography variant="h1" sx={{ color: "#1878f3" }}>
            facebook
          </Typography>

          <InputWithClearBtn
            name="email"
            type="email"
            getValues={getValues}
            placeholder="Email"
            control={control}
            errors={errors}
            resetField={resetField}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                message: "Invalid email",
              },
            })}
          />

          <PasswordInput
            control={control}
            {...register("password", {
              required: "Password is required",
            })}
            errors={errors}
          />

          <Button
            fullWidth
            variant="contained"
            form="sign-in-form"
            type="submit"
            // disabled={!user.email || !user.password}
          >
            Log in
          </Button>

          <Button>Forgot password?</Button>

          <Divider sx={{ width: "100%" }}>
            <Typography variant="body2">or</Typography>
          </Divider>

          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/sign-up")}
            sx={{ width: "fit-content" }}
          >
            Create new account
          </Button>
        </>
      )}
    </Stack>
  );
}

export default SignIn;

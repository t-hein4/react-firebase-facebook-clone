import { useState } from "react";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import InputWithClearBtn from "../components/Inputs/InputWithClearBtn.js";
import DatePicker from "../components/Inputs/DatePicker.js";
import RadioButtons from "../components/Buttons/RadioButtons.js";
import PasswordInput from "../components/Inputs/PasswordInput.js";
import { useAuthContextUpdater } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../hooks/useErrorHandler.js";
import Loading from "./Loading.js";
import { useForm } from "react-hook-form";

const defaultValues = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  phoneNumber: "",
  email: "",
  password: "",
};

function SignUp() {
  const navigate = useNavigate();
  const context = useAuthContextUpdater();

  const validator = useForm({ defaultValues });
  const {
    handleSubmit,
    control,
    resetField,
    register,
    getValues,
    formState: { errors },
    setValue,
  } = validator;

  const errorContext = useErrorHandler();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (user) => {
    try {
      setLoading(true);
      await context.handleSignUp(user);

      navigate("/");
    } catch (error) {
      errorContext.setError("error", error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Stack
      spacing={3}
      mx="auto"
      my={10}
      alignItems="center"
      width={{ sm: "50%", md: "40%", lg: "30%" }}
      component={"form"}
      autoComplete="off"
      id={"sign-up-form"}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {loading ? (
        <Loading>
          <Typography mb={10} color="primary" variant="h3">
            Creating account
          </Typography>
          <LinearProgress sx={{ width: 200 }} />
          <Typography variant="body2">Please wait</Typography>
        </Loading>
      ) : (
        <>
          <Typography color="primary" variant="h1">
            Create an account
          </Typography>

          <InputWithClearBtn
            name="firstName"
            type="text"
            getValues={getValues}
            placeholder="First name"
            control={control}
            errors={errors}
            resetField={resetField}
            {...register("firstName", {
              required: "First name is required",
            })}
          />

          <InputWithClearBtn
            name="lastName"
            type="text"
            getValues={getValues}
            placeholder="Last name"
            control={control}
            errors={errors}
            resetField={resetField}
            {...register("lastName", {
              required: "Last name is required",
            })}
          />

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

          <InputWithClearBtn
            name="phoneNumber"
            type="tel"
            getValues={getValues}
            placeholder="Mobile number"
            control={control}
            errors={errors}
            resetField={resetField}
            {...register("phoneNumber", {
              required: "Mobile number is required",
            })}
          />

          <DatePicker
            control={control}
            errors={errors}
            {...register("dob", {
              required: "Date of birth is required",
            })}
            getValues={getValues}
            setValue={setValue}
          />

          <PasswordInput
            control={control}
            {...register("password", {
              required: "Password is required",
            })}
            errors={errors}
          />

          <RadioButtons
            control={control}
            {...register("gender", {
              required: "Gender is required",
            })}
            errors={errors}
          />

          <Button
            fullWidth
            variant="contained"
            color="success"
            type="submit"
            form="sign-up-form"
          >
            Sign Up
          </Button>

          <Button size="small" onClick={() => navigate("/sign-in")}>
            Already have an account?
          </Button>
        </>
      )}
    </Stack>
  );
}

export default SignUp;

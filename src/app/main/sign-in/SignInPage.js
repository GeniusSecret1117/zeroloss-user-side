import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { AuthTextField } from "@fuse/core/Common/AuthTextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import jwtService from "../../auth/services/jwtService";

/**
 * Form Validation Schema
 */

const Root = styled("div")(({ theme }) => ({
  backgroundColor: "white",
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  boxShadow: "4px 4px 10px 0px #00000066",
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue("email", "", { shouldDirty: true, shouldValidate: true });
    setValue("password", "", { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit({ email, password }) {
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((error) => {
        console.log("error while signing up", error);
      });
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Root className="flex flex-col flex-auto items-center justify-center min-w-0">
      <CustomPaper className="w-full sm:w-auto min-h-auto rounded-xl bg-transparent mx-8 sm:mx-auto">
        <div className="w-auto sm:w-[480px] ">
          <div className="flex justify-center items-center h-[90px] bg-[#004F4C] rounded-t-xl">
            <img
              className="w-[150px]"
              src="assets/images/logo/logo.svg"
              alt="logo"
            />
          </div>
          <div className="p-[28px] sm:py-[32px] sm:px-[48px] bg-white rounded-b-xl items-center flex flex-col">
            <div className="flex items-center">
              <Typography component="p" className="text-[24px] font-medium">
                Sign in to&nbsp;
                <span className="font-HandelGothic font-medium text-[#083A3C]">
                  ZERO
                </span>
                <span
                  className="font-HandelGothic font-medium text-[#41D87B]"
                  color="secondary"
                >
                  LOSS
                </span>
              </Typography>
            </div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <AuthTextField
                    {...field}
                    className="mb-24"
                    placeholder="Email"
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                    size="medium"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <AuthTextField
                    {...field}
                    className="mb-12"
                    placeholder="Password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <div className="flex justify-end">
                <Link
                  className="text-[16px] font-medium !text-[#032123] !no-underline"
                  to="/auth/forgot-password"
                >
                  Forgot password
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label="I'm not a robot"
                        componentsProps={{
                          typography: {
                            className: "text-[16px] font-medium text-[#032123]", // Apply your Tailwind styles to the label
                          },
                        }}
                        control={<Checkbox size="small" {...field} />}
                      />
                    </FormControl>
                  )}
                />
              </div>

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-16 font-medium text-[16px]"
                aria-label="Sign In"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Sign In
              </Button>
            </form>
            <div className="flex justify-center mt-24">
              <Link
                className="text-[16px] font-normal !text-[#032123]"
                to="/sign-up"
              >
                Don't have an account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      </CustomPaper>
    </Root>
  );
}

export default SignInPage;

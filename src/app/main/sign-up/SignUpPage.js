import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import clsx from "clsx";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import JwtService from "src/app/auth/services/jwtService";

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
    .min(8, "Password is too short - must be at least 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character."
    ),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Please confirm your password."),

  robot: yup.boolean().oneOf([true], "Please confirm you are not a robot."),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions."),
});

const defaultValues = {
  email: "",
  password: "",
  confirm_password: "",
  referral: "",
  robot: false,
  terms: false,
};

const CheckIcon = () => {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#41D87B]">
      <CheckOutlinedIcon className="text-[#F3F9F7] text-[12px]" />
    </div>
  );
};
const CrossIcon = () => {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-[#FF143E]">
      <CloseOutlinedIcon className="text-[#F3F9F7] text-[12px]" />
    </div>
  );
};

function SignUpPage() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const [validPassword, setValidPassword] = useState("");

  // Validation checks
  const hasMinLength = validPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(validPassword);
  const hasLowerCase = /[a-z]/.test(validPassword);
  const hasNumber = /\d/.test(validPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(validPassword);

  function onSubmit({ email, password }) {
    const data = {
      email,
      password,
    };

    JwtService.createUser(data)
      .then((res) => {
        console.log("inside ceate user", res);
        console.log("inside ceate user 1", res.data.email);
        navigate("/verify-code", { state: { email: res.data.email } });
        console.log("inside ceate user 2", res.data.email);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Root className="flex flex-col flex-auto items-center justify-center min-w-0">
      <CustomPaper className="w-full sm:w-auto min-h-auto rounded-xl bg-transparent mx-8 sm:mx-auto">
        <div className="w-auto sm:w-[540px] ">
          <div className="flex justify-center items-center h-[90px] bg-[#004F4C] rounded-t-xl">
            <img
              className="w-[150px]"
              src="assets/images/logo/logo.svg"
              alt="logo"
            />
          </div>
          <div className="p-[28px] sm:py-[32px] bg-white rounded-b-xl items-center flex flex-col">
            <div className="flex items-center">
              <Typography component="p" className="text-[24px] font-medium">
                Create an account
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
                    className="mb-24"
                    placeholder="Password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={validPassword}
                    onChange={(e) => {
                      setValidPassword(e.target.value);
                      field.onChange(e);
                    }}
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
              <div className="mb-24">
                <Typography
                  component="p"
                  className="text-[16px] font-normal text-[#FF143E]"
                >
                  Please Add all necessary character to create safe password
                </Typography>
                <div className="flex gap-8 items-center">
                  {hasMinLength ? <CheckIcon /> : <CrossIcon />}
                  <Typography
                    className={clsx(
                      "text-[16px] font-medium ",
                      !hasMinLength && "text-[#FF143E]"
                    )}
                  >
                    Minimum 8 Characters
                  </Typography>
                </div>
                <div className="flex gap-8 items-center">
                  {hasUpperCase ? <CheckIcon /> : <CrossIcon />}
                  <Typography
                    className={clsx(
                      "text-[16px] font-medium ",
                      !hasUpperCase && "text-[#FF143E]"
                    )}
                  >
                    One Uppercase letter
                  </Typography>
                </div>
                <div className="flex gap-8 items-center">
                  {hasNumber ? <CheckIcon /> : <CrossIcon />}
                  <Typography
                    className={clsx(
                      "text-[16px] font-medium ",
                      !hasNumber && "text-[#FF143E]"
                    )}
                  >
                    One Number
                  </Typography>
                </div>
                <div className="flex gap-8 items-center">
                  {hasLowerCase ? <CheckIcon /> : <CrossIcon />}
                  <Typography
                    className={clsx(
                      "text-[16px] font-medium ",
                      !hasLowerCase && "text-[#FF143E]"
                    )}
                  >
                    One Lowercase Letter
                  </Typography>
                </div>
                <div className="flex gap-8 items-center">
                  {hasSpecialChar ? <CheckIcon /> : <CrossIcon />}
                  <Typography
                    className={clsx(
                      "text-[16px] font-medium ",
                      !hasSpecialChar && "text-[#FF143E]"
                    )}
                  >
                    One Special Character
                  </Typography>
                </div>
              </div>
              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <AuthTextField
                    {...field}
                    className="mb-24"
                    placeholder="Re-enter your password"
                    error={!!errors.confirm_password}
                    helperText={errors?.confirm_password?.message}
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
              <Controller
                name="referral"
                control={control}
                render={({ field }) => (
                  <AuthTextField
                    {...field}
                    className="mb-24"
                    placeholder="Referral code"
                    autoFocus
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    size="medium"
                  />
                )}
              />
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label={
                          <Typography
                            component="p"
                            className="text-[14px] font-normal"
                          >
                            By clicking "Create Account", you agree to{" "}
                            <Link
                              to="/terms-of-service"
                              className="font-bold !text-[#032123] !no-underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy-policy"
                              className="font-bold !text-[#032123] !no-underline"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </Typography>
                        }
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
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <Controller
                  name="robot"
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
                aria-label="Create Account"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Create Account
              </Button>
            </form>
            <div className="flex justify-center mt-24">
              <Link
                className="text-[16px] font-normal !text-[#032123]"
                to="/sign-in"
              >
                Already have account ? Sign In
              </Link>
            </div>
          </div>
        </div>
      </CustomPaper>
    </Root>
  );
}

export default SignUpPage;

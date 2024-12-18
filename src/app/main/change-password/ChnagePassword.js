import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { Typography, Button, InputAdornment, IconButton } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { PasswordTextField } from '@fuse/core/Common/AuthTextField';
import PasswordStrengthBar from '@fuse/core/Common/PasswordStrength';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import * as yup from 'yup';
import clsx from 'clsx';

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

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - must be at least 8 characters.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .matches(/\d/, 'Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'),

  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required('Please confirm your password.'),

  robot: yup.boolean().oneOf([true], 'Please confirm you are not a robot.'),
  terms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions.'),
});

const defaultValues = {
  email: '',
  password: '',
  confirm_password: '',
  referral: '',
  robot: false,
  terms: false,
};

function ChangePassword(props) {
  const { t } = useTranslation('changePasswordPage');
  const user = useSelector(selectUser);

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const [validPassword, setValidPassword] = useState('');

  // Validation checks
  const hasMinLength = validPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(validPassword);
  const hasLowerCase = /[a-z]/.test(validPassword);
  const hasNumber = /\d/.test(validPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(validPassword);

  function onSubmit({ email, password }) { }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Root
      content={
        <div className="w-full container pt-[24px]">
          <div className="p-[36px] grid grid-cols-12">
            <div className="col-span-12 md:col-span-8">
              <Typography className="font-semibold text-[40px]">Chanage Your Password</Typography>
              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Typography className="text-[14px] font-normal mb-4">Old Password</Typography>
                <Controller
                  name="old_password"
                  control={control}
                  render={({ field }) => (
                    <PasswordTextField
                      {...field}
                      className="mb-24"
                      placeholder="Password"
                      error={!!errors.old_password}
                      helperText={errors?.old_password?.message}
                      variant="outlined"
                      required
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
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
                <Typography className="text-[14px] font-normal mb-4">New Password</Typography>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordTextField
                      {...field}
                      className="mb-24"
                      placeholder="Password"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      variant="outlined"
                      required
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
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
                  <Typography component="p" className="text-[16px] font-normal text-[#FF143E]">
                    Please Add all necessary character to create safe password
                  </Typography>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2">
                    <div className="col-span-1">
                      <div className="flex gap-8 items-center">
                        {hasMinLength ? <CheckIcon /> : <CrossIcon />}
                        <Typography
                          className={clsx(
                            'text-[16px] font-medium ',
                            !hasMinLength && 'text-[#FF143E]'
                          )}
                        >
                          Minimum 8 Characters
                        </Typography>
                      </div>
                      <div className="flex gap-8 items-center">
                        {hasUpperCase ? <CheckIcon /> : <CrossIcon />}
                        <Typography
                          className={clsx(
                            'text-[16px] font-medium ',
                            !hasUpperCase && 'text-[#FF143E]'
                          )}
                        >
                          One Uppercase letter
                        </Typography>
                      </div>
                      <div className="flex gap-8 items-center">
                        {hasNumber ? <CheckIcon /> : <CrossIcon />}
                        <Typography
                          className={clsx(
                            'text-[16px] font-medium ',
                            !hasNumber && 'text-[#FF143E]'
                          )}
                        >
                          One Number
                        </Typography>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex gap-8 items-center">
                        {hasLowerCase ? <CheckIcon /> : <CrossIcon />}
                        <Typography
                          className={clsx(
                            'text-[16px] font-medium ',
                            !hasLowerCase && 'text-[#FF143E]'
                          )}
                        >
                          One Lowercase Letter
                        </Typography>
                      </div>
                      <div className="flex gap-8 items-center">
                        {hasSpecialChar ? <CheckIcon /> : <CrossIcon />}
                        <Typography
                          className={clsx(
                            'text-[16px] font-medium ',
                            !hasSpecialChar && 'text-[#FF143E]'
                          )}
                        >
                          One Special Character
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <Typography className="text-[14px] font-normal mb-4">Confirm Password</Typography>
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <PasswordTextField
                      {...field}
                      className="mb-8"
                      placeholder="Re-enter your password"
                      error={!!errors.confirm_password}
                      helperText={errors?.confirm_password?.message}
                      variant="outlined"
                      required
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
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
                <PasswordStrengthBar password={validPassword} />
                <Button
                  variant="contained"
                  color="secondary"
                  className="mt-16 font-medium text-[16px] w-full"
                  aria-label="Update"
                  type="submit"
                  size="large"
                >
                  Update Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default ChangePassword;

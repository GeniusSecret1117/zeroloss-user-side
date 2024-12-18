import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { AuthTextField } from '@fuse/core/Common/AuthTextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
/**
 * Form Validation Schema
 */

const Root = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  boxShadow: '4px 4px 10px 0px #00000066',
}));

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  email: '',
};

function ForgotPasswordPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [sentFlag, setSentFlag] = useState(false);

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
  }, [setValue]);

  function onSubmit({ email }) {
    setSentFlag(true);
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center min-w-0">
      <CustomPaper className="w-full sm:w-auto min-h-auto rounded-xl bg-transparent mx-8 sm:mx-auto">
        <div className="w-auto sm:w-[480px] ">
          <div className="flex justify-center items-center h-[90px] bg-[#004F4C] rounded-t-xl">
            <img className="w-[150px]" src="assets/images/logo/logo.svg" alt="logo" />
          </div>
          <div className="p-[28px] sm:py-[32px] bg-white rounded-b-xl items-center flex flex-col">
            {sentFlag ?
              <>
                <div className="flex items-center">
                  <Typography component="p" className="text-[24px] font-medium">
                    Password Sent
                  </Typography>
                </div>
                <div className="flex items-center mx-8">
                  <Typography component="p" className="text-[16px] font-normal text-center">
                    An email has been sent to (Email Address) If this email address is registered to&nbsp;
                    <span className="font-HandelGothic font-normal text-[#41D87B]">ZEROLOSS</span>
                    , you'll receive instructions on how to set a new password.
                  </Typography>
                </div>
                <div className="flex flex-col justify-center w-full mt-24">
                  <Button
                    href="sign-in"
                    variant="contained"
                    color="secondary"
                    className=" w-full mt-16 font-medium text-[16px]"
                    aria-label="Sign In"
                    size="large"
                  >
                    Sign In
                  </Button>
                </div>
              </>
              :
              <>
                <div className="flex items-center">
                  <Typography component="p" className="text-[24px] font-medium">
                    Reset your password
                  </Typography>
                </div>
                <div className="flex items-center mx-8">
                  <Typography component="p" className="text-[16px] font-normal text-center">
                    Enter your &nbsp;
                    <span className="font-HandelGothic font-normal text-[#41D87B]">ZEROLOSS</span>
                    &nbsp;email. so we can reset your password
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
                        className="mb-16"
                        placeholder="Enter Your Email"
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
                  <Button
                    variant="contained"
                    color="secondary"
                    className=" w-full mt-16 font-medium text-[16px]"
                    aria-label="Next"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                    size="large"
                  >
                    Next
                  </Button>
                </form>
              </>}
          </div>
        </div>
      </CustomPaper>
    </Root>
  );
}

export default ForgotPasswordPage;

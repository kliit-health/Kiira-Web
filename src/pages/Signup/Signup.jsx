import { Card, CardBody, Checkbox, Input } from '@material-tailwind/react';
import mixpanel from 'mixpanel-browser';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AppPasswordInput, Loader, SocialAuth } from 'src/components';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import Api from 'src/middleware/api';
import Auth from 'src/middleware/storage';
import { useSignup, useSignupWithGoogle } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import { useLocalStore } from 'src/store';
import { Toast } from 'src/utils';
import isEmpty from 'src/utils/isEmpty';

const Signup = () => {
  const navigate = useNavigate();
  const appPasswordRef = useRef(null);
  const appPasswordRef2 = useRef(null);
  const [checked, setChecked] = useState(false);
  const setStoredEmail = useLocalStore((state) => state.setStoredEmail);

  const { mutate, isLoading } = useSignup();
  const { mutate: mutateGoogleAuth, isLoading: isLoadingGoogleAuth } = useSignupWithGoogle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    if (!checked) {
      Toast.fire({
        icon: 'warning',
        title: `Please checkout our terms and conditions before you proceed`,
        width: '80vw'
      });
      return;
    }

    if (data?.password !== data?.confirm_password) {
      Toast.fire({
        icon: 'warning',
        title: `Passwords do not match`
      });
      return;
    }
    mutate(data, {
      onSuccess: (response) => {
        Auth.setUser(response.data?.user);
        Auth.setToken(response.data?.token);
        setStoredEmail({ email: data?.email });
        reset();

        if (!response.data?.user?.is_email_verified) {
          navigate(ROUTES.VERIFY_ACCOUNT, { replace: true });
          return;
        }
      },
      onError: (error) => {
        console.log(' \n 🚀 ~ file: Signup.jsx:74 ~ onSubmit ~ error:', error);
        Toast.fire({
          icon: 'error',
          title: !isEmpty(error.response?.data?.message)
            ? error.response?.data?.message
            : error?.message
        });

        if (error.response?.status === 426) {
          setStoredEmail({ email: data?.email });
          navigate(ROUTES.GET_ACTIVATION_CODE);
          return;
        }
      }
    });
  };

  return (
    <AuthLayout showSlider hideScroll>
      <Card className="w-full h-full shadow-none">
        <CardBody className="flex flex-col h-full max-h-[83vh] gap-4 lg:gap-6 p-4 lg:p-8 overflow-y-auto">
          <AppTypography variant="h2" className="text-[#252539] font-medium">
            Hello 👋🏽,
          </AppTypography>
          <AppTypography variant="small" className="text-lg font-normal text-kiiraText">
            In a few steps, you will be able to join a<br /> community of people enjoying quality
            health care
          </AppTypography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full gap-5 mt-5">
              <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                <ContentContainer className="gap-1 w-full">
                  <Input
                    autoComplete="given-name"
                    label="First Name"
                    size="lg"
                    className="ring-transparent ring-0 w-full"
                    name="first_name"
                    {...register('first_name', {
                      required: 'First Name is required.'
                    })}
                    error={!isEmpty(errors.first_name)}
                  />
                  {errors.first_name && (
                    <ContentContainer className="text-red-500 font-medium text-xs">
                      {errors.first_name.message}
                    </ContentContainer>
                  )}
                </ContentContainer>
                <ContentContainer className="gap-1 w-full">
                  <Input
                    autoComplete="family-name"
                    label="Last Name"
                    size="lg"
                    className="ring-transparent ring-0 w-full"
                    name="last_name"
                    {...register('last_name', {
                      required: 'Last Name is required.'
                    })}
                    error={!isEmpty(errors.last_name)}
                  />
                  {errors.last_name && (
                    <ContentContainer className="text-red-500 font-medium text-xs">
                      {errors.last_name.message}
                    </ContentContainer>
                  )}
                </ContentContainer>
              </ContentContainer>
              <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                <ContentContainer className="gap-1 w-full">
                  <Input
                    autoComplete="email"
                    label="Email"
                    size="lg"
                    className="ring-transparent ring-0 w-full"
                    name="email"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: 'Email is not valid.'
                      }
                    })}
                    error={!isEmpty(errors.email)}
                  />
                  {errors.email && (
                    <ContentContainer className="text-red-500 font-medium text-xs">
                      {errors.email.message}
                    </ContentContainer>
                  )}
                </ContentContainer>
                <ContentContainer className="gap-1 w-full">
                  <Input
                    autoComplete="tel"
                    label="Phone Number"
                    size="lg"
                    className="ring-transparent ring-0 w-full"
                    name="phone_number"
                    {...register('phone_number', {
                      required: 'Phone number is required.',
                      validate: {
                        // checkLength: (value) => value.length === 11
                        // matchPattern: (value) =>
                        //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                      }
                    })}
                    error={!isEmpty(errors.phone_number)}
                  />
                  {errors.phone_number && (
                    <ContentContainer className="text-red-500 font-medium text-xs">
                      {errors.phone_number.message}
                    </ContentContainer>
                  )}
                  {errors?.phone_number?.type === 'checkLength' && (
                    <ContentContainer className="text-red-500 font-medium text-xs">
                      Wrong phone number format
                    </ContentContainer>
                  )}
                </ContentContainer>
              </ContentContainer>
              <ContentContainer className="gap-1 w-full">
                <AppPasswordInput
                  ref={appPasswordRef}
                  autoComplete="off"
                  label="Password"
                  size="lg"
                  name="password"
                  {...register('password', {
                    required: 'Password is required.',
                    validate: {
                      checkLength: (value) => value.length >= 6
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                    }
                  })}
                  error={!isEmpty(errors.password)}
                />
                {errors.password && errors.password.type === 'required' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    {errors.password.message}
                  </ContentContainer>
                )}
                {errors?.password?.type === 'checkLength' && (
                  <ContentContainer className="text-kiiraBlue font-medium text-xs">
                    Password should be at least 6 characters.
                  </ContentContainer>
                )}
                {errors?.password?.type === 'matchPattern' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    Password should contain at least one uppercase letter, lowercase letter, digit,
                    and special symbol.
                  </ContentContainer>
                )}
              </ContentContainer>
              <ContentContainer className="gap-1 w-full">
                <AppPasswordInput
                  ref={appPasswordRef2}
                  autoComplete="off"
                  label="Confirm Password"
                  size="lg"
                  name="confirm_password"
                  {...register('confirm_password', {
                    required: 'Confirm Password is required.',
                    validate: {
                      checkLength: (value) => value.length >= 6
                      // matchPattern: (value) =>
                      //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                    }
                  })}
                  error={!isEmpty(errors.confirm_password)}
                />
                {errors.confirm_password && errors.confirm_password.type === 'required' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    {errors.confirm_password.message}
                  </ContentContainer>
                )}
                {errors?.confirm_password?.type === 'checkLength' && (
                  <ContentContainer className="text-kiiraBlue font-medium text-xs">
                    Password should be at least 6 characters.
                  </ContentContainer>
                )}
                {errors?.confirm_password?.type === 'matchPattern' && (
                  <ContentContainer className="text-red-500 font-medium text-xs">
                    Password should contain at least one uppercase letter, lowercase letter, digit,
                    and special symbol.
                  </ContentContainer>
                )}
              </ContentContainer>
            </div>
            <div className="flex flex-row flex-nowrap items-center -ml-2.5 mt-4">
              <Checkbox
                iconProps={{ size: 'xs' }}
                labelProps={{ className: 'p-1' }}
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <span className="text-sm">
                I agree to all the <Link className="text-kiiraBlue">Terms</Link> and
                <Link className="text-kiiraBlue"> Privacy Policies</Link>
              </span>
            </div>

            {isLoading || isLoadingGoogleAuth ? (
              <Loader />
            ) : (
              <AppButton
                size="md"
                background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
                className="text-sm font-medium text-white capitalize shadow-transparent mt-4"
                fullWidth
                type="submit">
                Create Account
              </AppButton>
            )}
          </form>
          <ContentContainer column className="items-center justify-center gap-2">
            <AppTypography variant="small" className="flex justify-center flex-wrap -mt-1">
              Already have an account?
              <Link to={ROUTES.LOGIN} className="ml-1 font-semibold text-kiiraBlue">
                Login
              </Link>
            </AppTypography>
            {/* <AppTypography variant="small" className="text-center">
              You may also click
              <Link
                to={ROUTES.GET_ACTIVATION_CODE}
                className="font-bold text-red-700 mx-1 uppercase">
                here to Activate
              </Link>{' '}
              your existing Kiira Acuity account
            </AppTypography> */}
          </ContentContainer>

          <SocialAuth
            dividerText="Or continue with"
            onGoogleAuthSuccess={(credential) => {
              const data = { accessToken: credential };

              mutateGoogleAuth(data, {
                onSuccess: (response) => {
                  Auth.setUser(response.data?.user);
                  Auth.setToken(response.data?.token);

                  mixpanel.track('Google Authentication Success', {
                    id: response.data?.user?.id,
                    data: {
                      first_name: response.data?.user?.first_name,
                      last_name: response.data?.user?.last_name,
                      email: response.data?.user?.email
                    }
                  });

                  setStoredEmail({ email: data?.email });
                  reset();

                  if (!response.data?.user?.is_email_verified) {
                    navigate(ROUTES.VERIFY_ACCOUNT, { replace: true });
                    return;
                  }
                  Toast.fire({
                    icon: 'success',
                    title: `Login ${response?.data?.message}:\nWelcome ${response?.data?.user?.first_name}`
                  });
                  navigate(ROUTES.INDEX, { replace: true });
                },
                onError: (error) => {
                  console.log(
                    '\n 🚀 ~ file: Signup.jsx:307 ~ Signup ~ SocialAuth error:',
                    error,
                    error?.response
                  );

                  mixpanel.track('Google Authentication Failed', {
                    error: error,
                    data: {
                      message: !isEmpty(error.response?.data?.message)
                        ? error.response?.data?.message
                        : error?.message
                    }
                  });

                  Toast.fire({
                    icon: 'error',
                    title: !isEmpty(error.response?.data?.message)
                      ? error.response?.data?.message
                      : error?.message
                  });
                }
              });
            }}
          />
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default Signup;

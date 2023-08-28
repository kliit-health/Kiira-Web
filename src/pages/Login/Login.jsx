import { useEffect, useRef } from 'react';
import { Card, CardBody, Checkbox, Input } from '@material-tailwind/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppPasswordInput, Loader, SocialAuth } from 'src/components';
import {
  AppButton,
  AppTypography,
  ContentContainer,
  Divider
} from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useLogin, useSigninWithGoogle } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';
import { useForm } from 'react-hook-form';
import isEmpty from 'src/utils/isEmpty';
import Api from 'src/middleware/api';
import Auth from 'src/middleware/storage';
import { useLocalStore } from 'src/store';
import { useQueryClient } from '@tanstack/react-query';
import KEYS from 'src/queries/queryKeys';
import { Mixpanel } from 'src/utils/mixpanelUtil';
import moment from 'moment-timezone';
import mixpanel from 'mixpanel-browser';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = location.state?.from?.pathname || ROUTES.INDEX;

  const appPasswordRef = useRef(null);
  const setStoredEmail = useLocalStore((state) => state.setStoredEmail);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useLogin();
  const { mutate: mutateGoogleAuth, isLoading: isLoadingGoogleAuth } = useSigninWithGoogle();

  useEffect(() => {
    Mixpanel.track(`Page Tracking - Login Page`);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        queryClient.setQueryData([[KEYS.PROFILE]], response.data?.user);
        queryClient.invalidateQueries({ queryKey: [KEYS.HISTORY] });

        setStoredEmail({ email: data?.email });
        Auth.setUser(response.data?.user);
        Auth.setToken(response.data?.token);

        Mixpanel.identify(response.data?.user?.id);
        Mixpanel.people.set({
          $distinct_id: response.data?.user?.id,
          $first_name: response.data?.user?.first_name,
          $last_name: response.data?.user?.last_name,
          $email: response.data?.user?.email,
          $phone: response.data?.user?.phone_number,
          $timezone: moment.tz.guess(true)
        });
        Mixpanel.track('Login Success ->', {
          id: response.data?.user?.id
        });

        Toast.fire({
          icon: 'success',
          title: `Login ${response?.data?.message}:\nWelcome ${response?.data?.user?.first_name}`
        });

        const { user } = response?.data;

        if (!user?.is_email_verified) {
          const emailData = {
            email: response.data?.user?.email
          };
          Api.auth.resendVerification(emailData);
          navigate(ROUTES.VERIFY_ACCOUNT, { replace: true });
          return;
        }

        navigate(previousLocation, { replace: true });
        return;
      },
      onError: (error) => {
        console.log('\n🚀 ~ file: Login.jsx:48 ~ onSubmit ~ error:', error, error?.response);
        Toast.fire({
          icon: 'error',
          title: !isEmpty(error.response?.data?.message)
            ? error.response?.data?.message
            : error?.message
        });

        Mixpanel.track('Login Failed ->', {
          // error: error,
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error?.response?.data?.message
              : error?.message,
            email: data?.email,
            url: error?.response?.config?.url
          }
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
        <CardBody className="flex flex-col h-full gap-4 lg:gap-6 p-4 lg:p-8 overflow-y-auto">
          <AppTypography variant="h2" className="text-[#252539] font-medium">
            Welcome 👋🏽,
          </AppTypography>

          <AppTypography variant="small" className="text-kiiraText">
            Login to access your Kiira account
          </AppTypography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 mt-5 ">
              <Input
                autoFocus
                label="Email"
                size="lg"
                className="ring-transparent ring-0"
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
                <ContentContainer className="text-red-500 font-medium text-xs -mt-4 mb-2">
                  {errors.email.message}
                </ContentContainer>
              )}

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
                <ContentContainer className="text-red-500 font-medium text-xs -mt-4 mb-2">
                  {errors.password.message}
                </ContentContainer>
              )}
              {errors?.password?.type === 'checkLength' && (
                <ContentContainer className="text-kiiraBlue font-medium text-xs -mt-4 mb-2">
                  Password should be at least 6 characters.
                </ContentContainer>
              )}
              {errors?.password?.type === 'matchPattern' && (
                <ContentContainer className="text-red-500 font-medium text-xs -mt-4 mb-2">
                  Password should contain at least one uppercase letter, lowercase letter, digit,
                  and special symbol.
                </ContentContainer>
              )}
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center -ml-2.5">
              <Checkbox
                label="Remember Me"
                labelProps={{
                  className: 'text-sm p-0 font-medium'
                }}
                iconProps={{ size: 'sm' }}
              />
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="ml-auto text-sm font-medium text-kiiraBlue">
                Forgot Password
              </Link>
            </div>

            {isLoading || isLoadingGoogleAuth ? (
              <Loader className="mt-6" />
            ) : (
              <AppButton
                size="md"
                background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
                className="text-sm font-medium text-white capitalize shadow-transparent mt-6"
                fullWidth
                type="submit">
                login
              </AppButton>
            )}
          </form>
          <ContentContainer column className="items-center justify-center gap-2">
            <AppTypography variant="small" className="flex justify-center -mt-1">
              Don't have an account?
              <Link to={ROUTES.SIGINUP} className="ml-1 font-semibold text-kiiraBlue">
                Sign up
              </Link>
            </AppTypography>
            {/* <AppTypography variant="small" className="text-center">
              You may also click{' '}
              <Link
                to={ROUTES.GET_ACTIVATION_CODE}
                className="font-bold text-red-700 mx-1 uppercase">
                here to Activate
              </Link>{' '}
              your existing Kiira Acuity account
            </AppTypography> */}
          </ContentContainer>

          <SocialAuth
            onGoogleAuthSuccess={(credential) => {
              const data = { accessToken: credential };

              mutateGoogleAuth(data, {
                onSuccess: (response) => {
                  queryClient.setQueryData([[KEYS.PROFILE]], response.data?.user);
                  queryClient.invalidateQueries({ queryKey: [KEYS.HISTORY] });

                  setStoredEmail({ email: data?.email });
                  Auth.setUser(response.data?.user);
                  Auth.setToken(response.data?.token);

                  Mixpanel.identify(response.data?.user?.id);
                  Mixpanel.people.set({
                    $distinct_id: response.data?.user?.id,
                    $first_name: response.data?.user?.first_name,
                    $last_name: response.data?.user?.last_name,
                    $email: response.data?.user?.email,
                    $phone: response.data?.user?.phone_number,
                    $timezone: moment.tz.guess(true)
                  });
                  Mixpanel.track('Google Authentication Success', {
                    data: { id: response.data?.user?.id }
                  });

                  Toast.fire({
                    icon: 'success',
                    title: `Login ${response?.data?.message}:\nWelcome ${response?.data?.user?.first_name}`
                  });

                  const { user } = response?.data;

                  if (!user?.is_email_verified) {
                    const emailData = {
                      email: response.data?.user?.email
                    };
                    Api.auth.resendVerification(emailData);
                    navigate(ROUTES.VERIFY_ACCOUNT, { replace: true });
                    return;
                  }

                  navigate(previousLocation, { replace: true });
                  return;
                },
                onError: (error) => {
                  console.log(
                    '\n🚀 ~ file: Login.jsx:48 ~ onSubmit ~ error:',
                    error,
                    error?.response
                  );
                  Mixpanel.track('Google Authentication Failed', {
                    data: {
                      message: !isEmpty(error.response?.data?.message)
                        ? error.response?.data?.message
                        : error?.message,
                      url: error?.response?.config?.url
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

export default Login;

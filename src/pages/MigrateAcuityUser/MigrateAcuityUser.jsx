import { Button, Card, CardBody, Input } from '@material-tailwind/react';
import { AppPasswordInput, Loader } from 'src/components';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/utils';
import { useMigrateAcuityUser } from 'src/queries/queryHooks';
import isEmpty from 'src/utils/isEmpty';
import { useLocalStore } from 'src/store';
import { useQueryClient } from '@tanstack/react-query';
import Auth from 'src/middleware/storage';
import KEYS from 'src/queries/queryKeys';
import { Mixpanel } from 'src/utils/mixpanelUtil';

const MigrateAcuityUser = () => {
  const navigate = useNavigate();
  const appPasswordRef = useRef(null);
  const appPasswordRef2 = useRef(null);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMigrateAcuityUser();
  const getStoredEmail = useLocalStore((state) => state.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    if (data?.password !== data?.confirm_password) {
      Toast.fire({
        icon: 'warning',
        title: `Passwords do not match`
      });
      return;
    }

    const payload = {
      email: getStoredEmail?.email,
      ...data
    };

    mutate(payload, {
      onSuccess: (response) => {
        reset();
        queryClient.setQueryData([[KEYS.PROFILE]], response.data?.user);
        queryClient.invalidateQueries({ queryKey: [KEYS.HISTORY] });

        Auth.setUser(response.data?.user);
        Auth.setToken(response.data?.token);

        Mixpanel.track('Existing Kiira Account Migration Success!', {
          id: response.data?.user?.id,
          data: {
            first_name: response.data?.user?.first_name,
            last_name: response.data?.user?.last_name,
            email: response.data?.user?.email
          }
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

        navigate(ROUTES.INDEX, { replace: true });
        return;
      },
      onError: (error) => {
        Mixpanel.track('Failed: Existing Kiira Account Migration Failed!', {
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error.response?.data?.message
              : error?.message,
            email: data?.email,
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
  };

  return (
    <AuthLayout showSlider hideScroll>
      <Card className="w-full h-full shadow-none">
        <CardBody className="flex flex-col h-full gap-8 px-8 py-8">
          <ContentContainer className="flex w-max">
            <Button
              variant="text"
              size="sm"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="flex items-center gap-2 text-kiiraText font-medium hover:bg-transparent normal-case px-1 py-2 ">
              <i className="fa fa-angle-left" aria-hidden="true"></i>Back to login
            </Button>
          </ContentContainer>
          <AppTypography variant="h2" className="text-[#252539] font-medium -mt-5">
            Set Password
          </AppTypography>
          <AppTypography variant="small" className="text-kiiraText text-base">
            Your previous password has been reseted. Please set a new password for your account.
          </AppTypography>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Enter Code"
              size="lg"
              type="number"
              className=""
              maxLength={4}
              minLength={4}
              {...register('code', {
                required: 'Code is required.',
                validate: {
                  checkLength: (value) => value.length === 4
                }
              })}
              autoComplete="false"
              autoFocus
              error={!isEmpty(errors.code)}
            />

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
                label="Re-enter Password"
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

            {isLoading ? (
              <Loader />
            ) : (
              <AppButton
                size="md"
                background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
                className="text-sm font-medium text-white capitalize shadow-transparent mt-4"
                fullWidth
                type="submit">
                Set password
              </AppButton>
            )}
          </form>
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default MigrateAcuityUser;

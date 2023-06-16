import { Button, Card, CardBody, Input } from '@material-tailwind/react';
import { AppPasswordInput, Loader } from 'src/components';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'src/utils';
import { useResetPassword } from 'src/queries/queryHooks';
import isEmpty from 'src/utils/isEmpty';
import { useLocalStore } from 'src/store';

const ResetPassword = () => {
  const navigate = useNavigate();
  const appPasswordRef = useRef(null);
  const appPasswordRef2 = useRef(null);
  const getStoredEmail = useLocalStore((state) => state.email);

  const { mutate, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
    
  } = useForm();

  const onSubmit = (data) => {
    if (data?.new_password !== data?.confirm_new_password) {
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
        Toast.fire({
          icon: 'success',
          title: response?.data?.message
        });
        navigate(ROUTES.LOGIN);
      },
      onError: (error) => {
        console.log(' \n 🚀 ~ file: ResetPassword.jsx:53 ~ onSubmit ~ error:', error);

        Toast.fire({
          icon: 'error',
          title: error.response?.data?.message
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
                label="Create Password"
                size="lg"
                name="new_password"
                {...register('new_password', {
                  required: 'Password is required.',
                  validate: {
                    checkLength: (value) => value.length >= 6
                    // matchPattern: (value) =>
                    //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                  }
                })}
                error={!isEmpty(errors.new_password)}
              />
              {errors.new_password && errors.new_password.type === 'required' && (
                <ContentContainer className="text-red-500 font-medium text-xs">
                  {errors.new_password.message}
                </ContentContainer>
              )}
              {errors?.new_password?.type === 'checkLength' && (
                <ContentContainer className="text-kiiraBlue font-medium text-xs">
                  Password should be at least 6 characters.
                </ContentContainer>
              )}
              {errors?.new_password?.type === 'matchPattern' && (
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
                name="confirm_new_password"
                {...register('confirm_new_password', {
                  required: 'Confirm Password is required.',
                  validate: {
                    checkLength: (value) => value.length >= 6
                    // matchPattern: (value) =>
                    //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                  }
                })}
                error={!isEmpty(errors.confirm_new_password)}
              />
              {errors.confirm_new_password && errors.confirm_new_password.type === 'required' && (
                <ContentContainer className="text-red-500 font-medium text-xs">
                  {errors.confirm_new_password.message}
                </ContentContainer>
              )}
              {errors?.confirm_new_password?.type === 'checkLength' && (
                <ContentContainer className="text-kiiraBlue font-medium text-xs">
                  Password should be at least 6 characters.
                </ContentContainer>
              )}
              {errors?.confirm_new_password?.type === 'matchPattern' && (
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

export default ResetPassword;

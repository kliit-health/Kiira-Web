import { Button, Card, CardBody, Input } from '@material-tailwind/react';
import {
  AppButton,
  AppTypography,
  ContentContainer,
  Divider
} from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useNavigate } from 'react-router-dom';
import { Loader, SocialAuth } from 'src/components';
import { useForgotPassword } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';
import { useForm } from 'react-hook-form';
import isEmpty from 'src/utils/isEmpty';
import { useLocalStore } from 'src/store';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useForgotPassword();
  const setStoredEmail = useLocalStore((state) => state.setStoredEmail);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setStoredEmail({ email: data.email });
        Toast.fire({
          icon: 'success',
          title: `Kindly check your email to continue`
        });
        navigate(ROUTES.RESET_PASSWORD);
      },
      onError: (error) => {
        console.log('\n🚀 ~ file: ForgotPassword.jsx:54 ~ onSubmit ~ error:', error);
        Toast.fire({
          icon: 'error',
          title: !isEmpty(error.response?.data?.message) ? error.response?.data?.message : error?.message
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
            Forgot password?
          </AppTypography>
          <AppTypography variant="small" className="text-kiiraText text-lg">
            Don’t worry, happens to all of us. Enter your email <br /> below to recover your
            password
          </AppTypography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              autoFocus
              label="Email"
              size="lg"
              className="ring-transparent ring-0 "
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
              <ContentContainer className="text-red-500 font-medium text-xs mb-2">
                {errors.email.message}
              </ContentContainer>
            )}

            {isLoading ? (
              <Loader className="mt-6" />
            ) : (
              <AppButton
                size="md"
                background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
                className="text-sm font-semibold text-white capitalize shadow-transparent mt-6"
                fullWidth
                type="submit">
                Submit
              </AppButton>
            )}
          </form>

          {/* <SocialAuth /> */}
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPassword;

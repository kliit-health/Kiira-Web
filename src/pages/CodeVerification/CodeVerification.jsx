import { Button, Card, CardBody, Input } from '@material-tailwind/react';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useNavigate } from 'react-router-dom';
import Api from 'src/middleware/api';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Toast } from 'src/utils';
import { useProfile, useVerifyEmail } from 'src/queries/queryHooks';
import { useForm } from 'react-hook-form';
import { Loader } from 'src/components';
import isEmpty from 'src/utils/isEmpty';
import { useLocalStore } from 'src/store';
import Auth from 'src/middleware/storage';
import mixpanel from 'mixpanel-browser';

const CodeVerification = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useProfile();
  const profile = userProfile?.data?.user;
  const { mutate, isLoading } = useVerifyEmail();
  const [loading, setLoading] = useState(false);
  const getStoredEmail = useLocalStore((state) => state.email);
  const isSubscribed = Auth.isSubscribed();

  useEffect(() => {}, [isSubscribed]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      email: !isEmpty(getStoredEmail?.email) ? getStoredEmail?.email : profile?.email,
      code: data?.code
    };
    mutate(payload, {
      onSuccess: (response) => {
        mixpanel.track('Success - Account Verification Successful!', {
          id: '',
          data: {
            email: payload?.email
          }
        });

        Toast.fire({
          icon: 'success',
          title: response?.data?.message
        });
        if (!isSubscribed) {
          navigate(ROUTES.SIGINUP_SUBSCRIPTION);
          return;
        }
        navigate(ROUTES.INDEX);
      },
      onError: (error) => {
        console.log(' \n 🚀 ~ file: CodeVerification.jsx:45 ~ onSubmit ~ error:', error);
        mixpanel.track('Failed - Account verification failed!', {
          error: error,
          data: {
            message: !isEmpty(error.response?.data?.message)
              ? error.response?.data?.message
              : error?.message,
            email: payload?.email
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

  const resendCode = async () => {
    setLoading(true);
    const email = {
      email: profile?.email
    };
    try {
      const response = await Api.auth.resendVerification(email);
      Toast.fire({
        icon: 'success',
        title: response?.data?.message
      });
    } catch (error) {
      console.log(' \n 🚀 ~ file: CodeVerification.jsx:17 ~ resendCode ~ error:', error);
    } finally {
      setLoading(false);
    }
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
            Verify code
          </AppTypography>
          <AppTypography variant="small" className="text-kiiraText text-base w-3/4">
            An authentication code has been sent to your email.
          </AppTypography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ContentContainer className="gap-4">
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
                error={!isEmpty(errors.code)}
              />
              <ContentContainer variant="small" className="flex flex-wrap flex-row items-center">
                Didn’t receive a code?
                {!loading ? (
                  <Button
                    variant="text"
                    to={ROUTES.VERIFY_ACCOUNT}
                    className="ml-1 font-semibold text-kiiraBlue p-0 px-1  capitalize text-sm"
                    onClick={resendCode}>
                    Resend
                  </Button>
                ) : (
                  <ThreeDots
                    height="24"
                    width="24"
                    radius="9"
                    color="#3F84FF"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{ marginLeft: '10px' }}
                    wrapperClassName=""
                    visible={true}
                  />
                )}
              </ContentContainer>
            </ContentContainer>

            <ContentContainer className="mt-4">
              {isLoading ? (
                <Loader />
              ) : (
                <AppButton
                  size="md"
                  background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
                  className="text-base font-semibold text-white capitalize shadow-transparent"
                  fullWidth
                  type="submit">
                  Verify
                </AppButton>
              )}
            </ContentContainer>
          </form>
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default CodeVerification;

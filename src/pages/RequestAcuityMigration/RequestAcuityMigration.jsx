import { Button, Card, CardBody, Input } from '@material-tailwind/react';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'src/components';
import { useRequesAcuityMigration } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';
import { useForm } from 'react-hook-form';
import isEmpty from 'src/utils/isEmpty';
import { useLocalStore } from 'src/store';

const RequestAcuityMigration = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useRequesAcuityMigration();
  const setStoredEmail = useLocalStore((state) => state.setStoredEmail);
  const storedEmail = useLocalStore((state) => state.email);
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
        navigate(ROUTES.MIGRATE_ACUITY_ACCOUNT);
      },
      onError: (error) => {
        console.log('\n🚀 ~ file: RequestAcuityMigration.jsx:54 ~ onSubmit ~ error:', error);
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
            Activate Acuity Account?
          </AppTypography>
          <AppTypography variant="small" className="text-kiiraText text-lg">
            A link will be sent to your email address
            <br />
            to migrate your Acuity profile
          </AppTypography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              autoFocus
              label="Email"
              defaultValue={storedEmail?.email}
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

export default RequestAcuityMigration;

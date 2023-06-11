import { Button, Card, CardBody } from '@material-tailwind/react';
import { AppPasswordInput } from 'src/components';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout showSlider hideScroll>
      <Card className="w-full h-full shadow-none">
        <CardBody className="flex flex-col h-full gap-8 px-8 py-8">
          <ContentContainer className="flex w-max">
            <Button
              variant="text"
              size="small"
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

          <AppPasswordInput label="Create Password" size="lg" className="" />
          <AppPasswordInput label="Re-enter Password" size="lg" className="" />

          <AppButton
            size="md"
            background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
            className="text-sm font-medium text-white capitalize shadow-transparent mt-6"
            fullWidth
            onClick={() => {
              setTimeout(() => {
                navigate(ROUTES.INDEX);
              }, 500);
            }}>
            Set password
          </AppButton>
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default ResetPassword;

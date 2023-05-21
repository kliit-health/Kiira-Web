import { Button, Card, CardBody,  } from '@material-tailwind/react';
import { Link, Navigate } from 'react-router-dom';
import { AppPasswordInput } from 'src/components';
import { AppButton, AppTypography, ContentContainer, Divider } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as AppleIcon } from 'src/assets/icons/apple.svg';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

const CodeVerification = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
              <i class="fa fa-angle-left" aria-hidden="true"></i>Back to login
            </Button>
          </ContentContainer>
          <AppTypography variant="h2" className="text-[#252539] font-medium -mt-5">
            Verify code
          </AppTypography>
          <AppTypography variant="small" className="text-kiiraText text-base w-3/4">
            An authentication code has been sent to your email.
          </AppTypography>

          <AppPasswordInput label="Enter Code" size="lg" className="" />
          <AppTypography variant="small" className="flex flex-wrap -mt-5">
            Didn’t receive a code?
            <Link to={ROUTES.CODE_VERIFICATION} className="ml-1 font-semibold text-kiiraBlue">
              Resend
            </Link>
          </AppTypography>

          <AppButton
            size="md"
            background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
            className="text-sm font-medium text-white capitalize shadow-transparent mt-6"
            fullWidth
            onClick={() => {
              login();
              setTimeout(() => {
                navigate(ROUTES.INDEX);
              }, 500);
            }}>
            Verify
          </AppButton>
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default CodeVerification;

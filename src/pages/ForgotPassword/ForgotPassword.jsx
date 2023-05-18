import { Button, Card, CardBody, Checkbox, Input, Typography } from '@material-tailwind/react';
import { Link, Navigate } from 'react-router-dom';
import { AppPasswordInput } from 'src/components';
import { AppButton, ContentContainer, Divider } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as AppleIcon } from 'src/assets/icons/apple.svg';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

const ForgotPassword = () => {
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
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-kiiraText font-medium hover:bg-transparent normal-case px-1 py-2 ">
              <i class="fa fa-angle-left" aria-hidden="true"></i>Back to login
            </Button>
          </ContentContainer>
          <Typography variant="h2" className="text-[#252539] font-medium -mt-5">
            Forgot password?
          </Typography>
          <Typography variant="small" className="text-kiiraText text-lg">
            Don’t worry, happens to all of us. Enter your email <br /> below to recover your
            password
          </Typography>

          <Input autoFocus label="Email" size="lg" className="ring-transparent ring-0" />

          <AppButton
            size="md"
            background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
            className="text-sm font-medium text-white capitalize shadow-transparent"
            fullWidth
            onClick={() => {
              login();
              setTimeout(() => {
                <Navigate to={ROUTES.INDEX} />;
              }, 500);
            }}>
            Submit
          </AppButton>

          <Divider className="my-4 text-sm text-kiiraText" data-content="Or login with" />

          <div className="flex flex-row justify-between w-full gap-5">
            <Button
              variant="text"
              className="w-full h-48 max-h-[48px] border border-kiiraBlue rounded-xl flex items-center justify-center">
              <FacebookIcon />
            </Button>
            <Button
              variant="text"
              className="w-full h-48 max-h-[48px] border border-kiiraBlue rounded-xl flex items-center justify-center">
              <GoogleIcon />
            </Button>
            <Button
              variant="text"
              className="w-full h-48 max-h-[48px] border border-kiiraBlue rounded-xl flex items-center justify-center">
              <AppleIcon />
            </Button>
          </div>
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPassword;

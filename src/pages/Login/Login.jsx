import { Button, Card, CardBody, Checkbox, Input, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPasswordInput } from 'src/components';
import { AppButton, Divider } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as AppleIcon } from 'src/assets/icons/apple.svg';
import useAuth from 'src/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <AuthLayout showSlider hideScroll>
      <Card className="w-full h-full shadow-none">
        <CardBody className="flex flex-col h-full gap-6 px-8 py-8">
          <Typography variant="h2" className="text-[#252539] font-medium">
            Welcome 👋🏽,
          </Typography>
          <Typography variant="small" className="text-kiiraText">
            Login to access your Kiira account
          </Typography>
          <div className="flex flex-col gap-5 mt-5 ">
            <Input autoFocus label="Email" size="lg" className="ring-transparent ring-0" />
            <AppPasswordInput autoComplete="off" label="Password" size="lg" />
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
          <AppButton
            size="md"
            background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
            className="text-sm font-medium text-white capitalize shadow-transparent"
            fullWidth
            onClick={() => {
              login();
              setTimeout(() => {
                navigate(ROUTES.INDEX);
              }, 500);
            }}>
            Login
          </AppButton>
          <Typography variant="small" className="flex justify-center -mt-1">
            Don't have an account?
            <Link to={ROUTES.SIGINUP} className="ml-1 font-semibold text-kiiraBlue">
              Sign up
            </Link>
          </Typography>
          <Divider className="my-6 text-sm text-kiiraText" data-content="Or login with" />

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

export default Login;

import { Button, Card, CardBody, Checkbox, Input, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPasswordInput, SocialAuth } from 'src/components';
import { AppButton, Divider } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';

import useAuth from 'src/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <AuthLayout showSlider hideScroll>
      <Card className="w-full h-full shadow-none">
        <CardBody className="flex flex-col h-full gap-4 lg:gap-6 p-4 lg:p-8 ">
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
                navigate(ROUTES.INDEX, { replace: true });
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

          <SocialAuth />
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default Login;

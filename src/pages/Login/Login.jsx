import { Button, Card, CardBody, Checkbox, Input } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { AppPasswordInput, SocialAuth } from 'src/components';
import { AppButton, AppTypography, Divider } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { useLogin } from 'src/queries/queryHooks';
import { Toast } from 'src/utils';

const Login = () => {
  const navigate = useNavigate();

  const { mutate, error, isError, isLoading } = useLogin();
  console.log(
    '🚀 ~ file: Login.jsx:16 ~ Login ~ data:',
    mutate,
    isError,
    isLoading,
    error?.response?.data?.message
  );

  Toast.fire({
    icon: 'success',
    title: 'welcome'
  });

  return (
    <AuthLayout showSlider hideScroll>
      <Card className="w-full h-full shadow-none">
        <CardBody className="flex flex-col h-full gap-4 lg:gap-6 p-4 lg:p-8 ">
          <AppTypography variant="h2" className="text-[#252539] font-medium">
            Welcome 👋🏽,
          </AppTypography>
          <AppTypography variant="small" className="text-kiiraText">
            Login to access your Kiira account
          </AppTypography>
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
              setTimeout(() => {
                navigate(ROUTES.INDEX);
              }, 500);
            }}>
            {isLoading ? null : 'Login'}
          </AppButton>
          <AppTypography variant="small" className="flex justify-center -mt-1">
            Don't have an account?
            <Link to={ROUTES.SIGINUP} className="ml-1 font-semibold text-kiiraBlue">
              Sign up
            </Link>
          </AppTypography>
          <Divider className="my-6 text-sm text-kiiraText" data-content="Or login with" />

          <SocialAuth />
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default Login;

import { Button, Card, CardBody, Checkbox, Input, Typography } from '@material-tailwind/react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppPasswordInput } from 'src/components';
import { AppButton, ContentContainer, Divider } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { ReactComponent as FacebookIcon } from 'src/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from 'src/assets/icons/google.svg';
import { ReactComponent as AppleIcon } from 'src/assets/icons/apple.svg';
import useAuth from 'src/hooks/useAuth';

const Signup = () => {
  const navigate = useNavigate()
  const { login } = useAuth();
  return (
    <AuthLayout showSlider hideScroll>
      <Card className="w-full h-full shadow-none">
        <CardBody className="flex flex-col h-full gap-6 px-8 py-8">
          <Typography variant="h2" className="text-[#252539] font-medium">
            Hello 👋🏽,
          </Typography>
          <Typography variant="small" className="text-lg font-normal text-kiiraText">
            In a few steps, you will be able to join a<br /> community of people enjoying quality
            health care
          </Typography>
          <div className="flex flex-col w-full gap-5 mt-5">
            <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap">
              <Input label="First Name" size="lg" className="w-full" autoComplete="given-name" />
              <Input label="Last Name" size="lg" className="w-full" autoComplete="family-name" />
            </ContentContainer>
            <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap">
              <Input label="Email" size="lg" className="w-full" autoComplete="email" />
              <Input label="Phone Number" size="lg" className="w-full" autoComplete="tel" />
            </ContentContainer>
            <AppPasswordInput
              autoComplete="off"
              label="Password"
              size="lg"
              className="border border-kiiraText/25"
            />
            <AppPasswordInput autoComplete="off" label="Confirm Password" size="lg" />
          </div>
          <div className="flex flex-row flex-nowrap items-center -ml-2.5">
            <Checkbox iconProps={{ size: 'xs' }} labelProps={{ className: 'p-1' }} />
            <span className="text-sm">
              I agree to all the <Link className="text-kiiraBlue">Terms</Link> and
              <Link className="text-kiiraBlue"> Privacy Policies</Link>
            </span>
          </div>

          <AppButton
            size="md"
            background="linear-gradient(306.23deg, #0A02E2 0%, #00C0E2 102.89%)"
            className="text-sm font-medium text-white capitalize shadow-transparent"
            fullWidth
            onClick={() => {
              login();
              setTimeout(() => {
                navigate(ROUTES.SIGINUP_SUBSCRIPTION);
              }, 500);
            }}>
            Create Account
          </AppButton>
          <Typography variant="small" className="flex justify-center flex-wrap -mt-1">
            Already have an account?
            <Link to={ROUTES.LOGIN} className="ml-1 font-semibold text-kiiraBlue">
              Login
            </Link>
          </Typography>
        </CardBody>
      </Card>
    </AuthLayout>
  );
};

export default Signup;

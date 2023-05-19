import { Card, CardBody, Checkbox, Input, Typography } from '@material-tailwind/react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppPasswordInput } from 'src/components';
import { AppButton, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { ReactComponent as Visa } from 'src/assets/icons/visa.svg';
import useAuth from 'src/hooks/useAuth';

const SignupSubscription = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return (
    <AuthLayout hideScroll>
      <ContentContainer className="flex flex-row w-full h-full gap-6 2xl:gap-2 mb-2 flex-wrap 2xl:flex-nowrap">
        {/* Payment Plan  */}
        <Card className="w-full h-auto 2xl:h-full shadow-none bg-transparent">
          <CardBody className="flex flex-col h-full gap-6 px-8 py-4">
            <Typography variant="h2" className="text-[#252539] font-medium">
              Select a plan
            </Typography>
          </CardBody>
        </Card>

        {/* Payment Form */}
        <Card className="w-full h-auto 2xl:h-full shadow-none">
          <CardBody className="flex flex-col h-full gap-6 px-8 py-8">
            <Typography variant="h3" className="text-[#252539] font-medium">
              Add payment
            </Typography>
            <Typography variant="small" className="text-base font-normal text-kiiraText">
              Start enjoying amazing benefits as a member
            </Typography>
            <div className="flex flex-col w-full gap-5 mt-5">
              <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                <Input label="Card Number" size="lg" className="w-full" icon={<Visa />} />
              </ContentContainer>
              <ContentContainer className="flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                <Input label="Exp. Date" size="lg" className="w-full" />
                <Input label="CVC" size="lg" className="w-full" />
              </ContentContainer>
              <Input label="Name on Card" size="lg" className="w-full" />
              <Input label="Postal Code" size="lg" className="w-full" />
            </div>
            <div className="flex flex-row flex-nowrap items-center -ml-2.5">
              <Checkbox
                color="blue-gray"
                iconProps={{ size: 'xs' }}
                label="Securely save my information for 1-click checkout"
                labelProps={{ className: 'p-1 font-medium text-sm -ml-2' }}
              />
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
              Subscribe
            </AppButton>
            <Typography
              variant="small"
              className="flex justify-center flex-wrap -mt-1 text-center text-xs text-kiiraText/75">
              By confirming your subscription, you allow Kiira health to charge your card for this
              payment and future payments in accordance with their terms. You can always cancel your
              subscription.
            </Typography>
          </CardBody>
        </Card>
      </ContentContainer>
    </AuthLayout>
  );
};

export default SignupSubscription;

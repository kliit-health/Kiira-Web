import { Card, CardBody, Checkbox, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { AppButton, AppTypography, ContentContainer } from 'src/components/shared/styledComponents';
import { AuthLayout } from 'src/layouts';
import { ROUTES } from 'src/routes/Paths';
import { ReactComponent as Visa } from 'src/assets/icons/visa.svg';
import useAuth from 'src/hooks/useAuth';
import { SubscriptionPlans } from 'src/components';
import { kiiraSubscriptions } from 'src/data';
import { useProducts } from 'src/queries/queryHooks';

const SignupSubscription = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useProducts();
  const products = data?.data?.products;
  console.log(
    ' \n 🚀 ~ file: SignupSubscription.jsx:16 ~ SignupSubscription ~ products:',
    products
  );

  return (
    <AuthLayout hideScroll>
      <ContentContainer
        className="flex flex-row w-full h-full gap-6 2xl:gap-2 mb-2 flex-wrap lg:flex-nowrap"
        hideScroll>
        {/* Payment Plan  */}
        <ContentContainer
          className="flex flex-row w-full h-full gap-4 overflow-hidden overflow-x-auto"
          hideScroll>
          <Card className="w-full h-auto 2xl:h-full shadow-none bg-transparent">
            <CardBody className="flex flex-col h-full gap-4 p-0">
              <AppTypography
                variant="h2"
                className="text-[#252539] font-medium text-2xl lg:text-3xl ">
                Select a plan
              </AppTypography>

              <ContentContainer className="flex flex-row w-full h-full overflow-hidden overflow-x-auto flex-nowrap gap-5">

                {products?.map((plan, index) => {
                  return <SubscriptionPlans subscription={plan} key={index?.toString()} />;
                })}
              </ContentContainer>
            </CardBody>
          </Card>
        </ContentContainer>

        {/* Payment Form */}
        <Card className="w-full h-auto 2xl:h-full shadow-none">
          <CardBody className="flex flex-col h-full gap-6 px-8 py-8">
            <AppTypography variant="h3" className="text-[#252539] font-medium">
              Add payment
            </AppTypography>
            <AppTypography variant="small" className="text-base font-normal text-kiiraText">
              Start enjoying amazing benefits as a member
            </AppTypography>
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
                setTimeout(() => {
                  navigate(ROUTES.INDEX);
                }, 500);
              }}>
              Subscribe
            </AppButton>
            <AppTypography
              variant="small"
              className="flex justify-center flex-wrap -mt-1 text-center text-xs text-kiiraText/75">
              By confirming your subscription, you allow Kiira health to charge your card for this
              payment and future payments in accordance with their terms. You can always cancel your
              subscription.
            </AppTypography>
          </CardBody>
        </Card>
      </ContentContainer>
    </AuthLayout>
  );
};

export default SignupSubscription;

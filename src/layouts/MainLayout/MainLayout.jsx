import { bool, element } from 'prop-types';
import { AppNavBar, InnerNavBar } from 'src/components';
import {
  AppTypography,
  ContentContainer,
  LayoutWrapper
} from 'src/components/shared/styledComponents';
import gradientBg from 'src/assets/images/gradientBg.png';
import { Alert, Button, Card } from '@material-tailwind/react';
import { node } from 'prop-types';
import { useProducts, useProfile } from 'src/queries/queryHooks';
import { ROUTES } from 'src/routes/Paths';
import { Link, redirect } from 'react-router-dom';
import moment from 'moment-timezone';

const MainLayout = ({ children, hideScroll }) => {
  const { data, isLoading: profileLoading } = useProfile();
  const { data: productData } = useProducts();
  const products = productData?.data?.products;
  const profile = data?.data?.user;

  const currentSubscriptionDetails = products?.find(
    (product) => profile?.subscription_id == product?.id
  );

  const today = moment();
  const expiry_date = moment(profile?.subscription_expiry_date);
  const dateDiif = expiry_date.diff(today, 'days');

  return (
    <ContentContainer width="100vw" className="h-full overflow-y-auto">
      <img
        className="w-96 h-72 rounded-lg absolute right-0 top-8"
        src={gradientBg}
        alt=""
        loading="lazy"
      />
      <LayoutWrapper
        hideScroll={hideScroll}
        className="bg-transparent gap-1 h-full max-h-full overflow-y-auto">
        <AppNavBar />
        <ContentContainer className="min-h-[16vh] w-full gap-3 mt-4">
          <AppTypography
            variant="h2"
            className="text-kiiraBlackText text-3xl md:text-4xl lg:text-4xl">
            Hello {profile?.first_name},
            <br />
            Welcome back 👋🏾
          </AppTypography>
          <AppTypography
            variant="small"
            className="text-kiiraText text-sm md:text-lg w-full lg:w-3/4 xl:w-1/2">
            Manage your health on the go, connect with doctors, book appointments and much more.
          </AppTypography>
          {moment().isAfter(profile?.subscription_expiry_date, 'day') && !profileLoading ? (
            <Alert
              open={true}
              className="flex items-center text-sm p-3 bg-[#c92e2e]/10 border-l-4 border-[#c92e2e] rounded font-medium"
              icon={<i className="fa-solid fa-triangle-exclamation text-[#c92e2e] text-lg"></i>}
              action={
                <Link
                  to={ROUTES.SUBSCRIPTION}
                  className="!absolute top-auto right-3 px-2 py-1 items-center flex gap-1 text-kiiraBlue rounded-md">
                  <Button color="blue" size="sm">
                    {/* <i className="fa-regular fa-circle-xmark text-white text-lg"></i>  */}
                    renew
                  </Button>
                </Link>
              }>
              <AppTypography variant="h6" className="text-[#c92e2e] font-montserrat mr-5">
                Your <span className="text-kiiraBlue">{currentSubscriptionDetails?.name}</span>{' '}
                subscription has expired...{' '}
                <span className="text-kiiraDark text-sm font-montserrat">
                  {moment(profile?.subscription_expiry_date).format('MMM DD, YYYY')}
                </span>
              </AppTypography>
            </Alert>
          ) : null}
          {dateDiif > 0 && dateDiif < 8 && !profileLoading ? (
            <Alert
              open={true}
              color="amber"
              className="flex items-center text-sm p-3 bg-[#FFC007]/40 border-l-4 border-kiiraBlue rounded font-medium"
              icon={<i className="fa fa-bullhorn text-kiiraBlue text-xl" aria-hidden="true"></i>}
              action={
                <Link
                  to={ROUTES.SUBSCRIPTION}
                  className="!absolute top-auto right-3 px-2 py-1 items-center flex gap-1 text-kiiraBlue rounded-md">
                  <Button  color="blue" size="sm">
                    {/* <i className="fa-regular fa-circle-xmark text-white text-lg"></i>  */}
                    renew
                  </Button>
                </Link>
              }>
              <AppTypography variant="h6" className="text-kiiraBlackishGreen font-montserrat mr-5">
                Your{' '}
                <span className="text-kiiraBlue font-montserrat">
                  {currentSubscriptionDetails?.name}
                </span>{' '}
                subscription will expire in less than{' '}
                <span className="text-kiiraBlue font-montserrat">{dateDiif} days</span>...{' '}
                <span className="text-kiiraDark text-sm font-montserrat">
                  {moment(profile?.subscription_expiry_date).format('MMM D, YYYY')}
                </span>
              </AppTypography>
            </Alert>
          ) : null}

          <InnerNavBar />
        </ContentContainer>
        <ContentContainer className="min-h-[58vh] w-full h-full">
          <Card className="p-1 md:px-8 md:py-4 h-full w-full  overflow-hidden overflow-y-auto shadow-none">
            {children}
          </Card>
        </ContentContainer>
      </LayoutWrapper>
    </ContentContainer>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: node.isRequired,
  hideScroll: bool
};

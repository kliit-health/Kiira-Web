import { bool, element } from 'prop-types';
import { AppNavBar, InnerNavBar } from 'src/components';
import {
  AppTypography,
  ContentContainer,
  LayoutWrapper
} from 'src/components/shared/styledComponents';
import gradientBg from 'src/assets/images/gradientBg.png';
import { Card } from '@material-tailwind/react';
import { node } from 'prop-types';
import { useProfile } from 'src/queries/queryHooks';

const MainLayout = ({ children, hideScroll }) => {
  const { data } = useProfile();
  const profile = data?.data?.user;

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

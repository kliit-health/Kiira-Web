import { bool, element } from 'prop-types';
import { AppNavBar, InnerNavBar } from 'src/components';
import { ContentContainer, LayoutWrapper } from 'src/components/shared/styledComponents';
import gradientBg from 'src/assets/images/gradientBg.png';
import { Card, Typography } from '@material-tailwind/react';
import useAuth from 'src/hooks/useAuth';

const MainLayout = ({ children, hideScroll }) => {
  const { user } = useAuth();
  return (
    <ContentContainer width="100vw" className="h-full overflow-y-auto">
      <img
        className="w-96 h-72 rounded-lg absolute right-0 top-8"
        src={gradientBg}
        alt="nature image"
      />
      <LayoutWrapper
        hideScroll={hideScroll}
        className="bg-transparent gap-1 h-full max-h-full overflow-y-auto">
        <AppNavBar />
        <ContentContainer className="min-h-[16vh] w-full gap-3">
          <Typography variant="h2" className="text-kiiraBlackText text-3xl md:text-4xl lg:text-4xl">
            Hello {user?.firstName},
            <br />
            Welcome back 👋🏾
          </Typography>
          <Typography
            variant="small"
            className="text-kiiraText text-sm md:text-lg w-full lg:w-3/4 xl:w-1/2">
            Manage your health on the go, connect with doctors, book appointments and much more.
          </Typography>
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
  children: element,
  hideScroll: bool
};

import { Typography } from '@material-tailwind/react';
import React from 'react';
import { ContentContainer } from 'src/components/shared/styledComponents';
import { MainLayout } from 'src/layouts';

const Home = () => {
  return (
    <MainLayout>
      <ContentContainer width="100%" height="100%" className="h-full min-h-[50vh]">
        <Typography variant="h6" className="text-kiiraDark font-bold text-lg">
          Kick it with Kiira
        </Typography>
      </ContentContainer>
    </MainLayout>
  );
};

export default Home;

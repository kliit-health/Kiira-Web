import React from 'react';
import { AppTypography, ContentContainer } from '../shared/styledComponents';
import { AuthLayout, MainLayout } from 'src/layouts';
import { IMAGES } from 'src/data';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/routes/Paths';

const PageNotFound = () => {
  return (
    <MainLayout>
      <ContentContainer
        width="100%"
        height="100%"
        className="h-full min-h-[50vh] bg-kiiraBg2 shadow-lg rounded w-full  p-4 lg:px-10 lg:py-4 gap-4 overflow-hidden overflow-y-auto items-center justify-center">
        <ContentContainer className="row gap-4 flex-wrap w-full h-full justify-center items-center">
          <IMAGES.KiiraLogoSvg className="h-auto  lg:w-80 object-cover" />

          <ContentContainer className="text-kiiraBlue text-lg font-extrabold !font-montserrat text-center uppercase">
            Hey! You seem to be lost...
          </ContentContainer>
          <AppTypography className="text-kiiraBlackishGreen  text-sm font-medium font-poppins text-center">
            Sorry, the page you were looking for could not be found, you can go back to the{' '}
            <Link to={-1} className="text-kiiraBlue hover:text-red-600 font-bold">
              previous page
            </Link>{' '}
            or we could take you right back{' '}
            <Link to={ROUTES.INDEX} className="text-kiiraBlue hover:text-red-600 font-bold">
              home
            </Link>
          </AppTypography>
        </ContentContainer>
      </ContentContainer>
    </MainLayout>
  );
};

export default PageNotFound;

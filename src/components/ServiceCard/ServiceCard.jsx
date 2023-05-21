import React from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES } from 'src/data';
import { Avatar, Button } from '@material-tailwind/react';
import { object } from 'prop-types';
import tw, { styled } from 'twin.macro';

const ServiceContainer = styled(ContentContainer)`
  ${tw`col-auto flex-col w-full max-w-max rounded-3xl h-full bg-kiiraBg2 gap-2`}
`;

const ServiceCard = ({ service }) => {
  return (
    <ServiceContainer className="">
      <ContentContainer className="w-full p-3 shrink-0 m-0 pb-0">
        <img src={service?.icon} alt="image" className="w-full h-full object-cover rounded-2xl" />
      </ContentContainer>
      <ContentContainer className="p-4 w-full gap-4 pt-0">
        <ContentContainer className="flex flex-col justify-between flex-nowrap">
          <AppTypography
            variant="lead"
            color="blue"
            className="capitalise text-kiiraDark text-lg font-bold font-poppins">
            {service?.title}
          </AppTypography>
          <AppTypography variant="small" className="text-kiiraBlackishGreen/75 -mt-1">
            excl. discount
          </AppTypography>
        </ContentContainer>
        <ContentContainer col>
          <AppTypography variant="h6" className="text-kiiraBlackishGreen/75 font-semibold">
            April 21, 2023 at
          </AppTypography>
          <AppTypography variant="small" className="font-semibold text-kiiraBlackishGreen/75 -mt-1">
            12:00am
          </AppTypography>
        </ContentContainer>
        <ContentContainer className="flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-2 items-center">
          <Avatar src={IMAGES.inboxImg} alt="pic" size="sm" className="rounded-full" />
          <ContentContainer row className="gap-1 items-center">
            <AppTypography
              variant="small"
              className="text-sm md:text-sm text-kiiraText font-semibold">
              With
            </AppTypography>
            <AppTypography variant="lead" className="text-sm md:text-sm text-kiiraDark font-medium">
              Dr. Candice Fraser
            </AppTypography>
          </ContentContainer>
        </ContentContainer>
        <AppTypography
          variant="small"
          className="text-sm md:text-sm text-kiiraText font-normal font-montserrat flex flex-row flex-nowrap gap-2 items-center">
          <IMAGES.LocationIcon /> <span>Virtual</span>
        </AppTypography>

        <hr className="bg-kiiraText" />
        <AppTypography variant="h6" className="font-montserrat text-kiiraBlue font-bold text-xs">
          $150.00
        </AppTypography>
        <Button size="sm" className="w-32 rounded-full text-[8px] bg-kiiraBlue">
          Book now
        </Button>
      </ContentContainer>
    </ServiceContainer>
  );
};

export default ServiceCard;

ServiceCard.propTypes = {
  service: object
};

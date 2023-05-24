import React from 'react';
import { AppButton, AppTypography, ContentContainer } from '../shared/styledComponents';
import { IMAGES } from 'src/data';
import { Avatar } from '@material-tailwind/react';
import { bool } from 'prop-types';
import tw, { styled } from 'twin.macro';

const BookingContainer = styled(ContentContainer)(({ disabled }) => [
  tw`flex-col md:flex-row w-full max-w-max rounded-l-2xl lg:max-h-[360px]`,
  disabled && tw`cursor-not-allowed opacity-50`
]);

const BookingCard = ({ disabled }) => {
  return (
    <BookingContainer className="" disabled={disabled}>
      <ContentContainer className="w-full sm:w-1/4  shrink-0 m-0 rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none bg-[#E2EDFF] bg-blend-darken">
        <img
          src={IMAGES?.medicalAid}
          alt="image"
          className="w-full h-[150px] sm:h-full object-cover rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none"
          loading='lazy' 
        />
      </ContentContainer>
      <ContentContainer className="p-2 md:p-4 w-full gap-4">
        <ContentContainer row className="flex justify-between flex-nowrap">
          <AppTypography
            variant="h6"
            color="blue"
            className="capitalise text-kiiraBlackishGreen text-lg lg:text-2xl font-semibold">
            General Health Assessment
          </AppTypography>
          <ContentContainer col className="-mt-1">
            <AppTypography
              variant="h4"
              className="text-right font-montserrat text-kiiraBlue font-bold">
              $150.00
            </AppTypography>
            <AppTypography
              variant="small"
              className="text-[0.65rem] text-right text-kiiraBlackishGreen/75 -mt-1">
              excl. discount
            </AppTypography>
          </ContentContainer>
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
            <AppTypography variant="small" className="text-sm md:text-sm text-kiiraText font-semibold">
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

        <AppButton size="md" fullWidth disabled={disabled}>
          View Booking
        </AppButton>
      </ContentContainer>
    </BookingContainer>
  );
};

BookingCard.propTypes = {
  disabled: bool
};

BookingCard.defaultProps = {
  disabled: false
};

export default BookingCard;

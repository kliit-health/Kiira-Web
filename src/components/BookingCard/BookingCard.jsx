import React from 'react';
import { AppButton, ContentContainer } from '../shared/styledComponents';
import { IMAGES } from 'src/data';
import { Avatar, Typography } from '@material-tailwind/react';
import { bool } from 'prop-types';
import tw, { styled } from 'twin.macro';

const BookingContainer = styled(ContentContainer)(({ disabled }) => [
  tw`flex-col md:flex-row w-full max-w-max rounded-l-2xl lg:max-h-[360px]`,
  disabled && tw`cursor-not-allowed opacity-50`
]);

const BookingCard = ({ disabled }) => {
  return (
    <BookingContainer className="" disabled={disabled}>
      <ContentContainer className="w-full sm:w-1/4  shrink-0 m-0 rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none bg-[#E2EDFF] mix-blend-darken">
        <img
          src={IMAGES?.medicalAid}
          alt="image"
          className="w-full h-[150px] sm:h-full object-cover rounded-t-xl  md:rounded-r-none md:rounded-l-xl rounded-b-none"
        />
      </ContentContainer>
      <ContentContainer className="p-2 md:p-4 w-full gap-4">
        <ContentContainer row className="flex justify-between flex-nowrap">
          <Typography
            variant="h6"
            color="blue"
            className="capitalise text-kiiraBlackishGreen text-lg lg:text-2xl font-semibold">
            General Health Assessment
          </Typography>
          <ContentContainer col className="-mt-1">
            <Typography
              variant="h4"
              className="text-right font-montserrat text-kiiraBlue font-bold">
              $150.00
            </Typography>
            <Typography
              variant="small"
              className="text-[0.65rem] text-right text-kiiraBlackishGreen/75 -mt-1">
              excl. discount
            </Typography>
          </ContentContainer>
        </ContentContainer>
        <ContentContainer col>
          <Typography variant="h6" className="text-kiiraBlackishGreen/75 font-semibold">
            April 21, 2023 at
          </Typography>
          <Typography variant="small" className="font-semibold text-kiiraBlackishGreen/75 -mt-1">
            12:00am
          </Typography>
        </ContentContainer>
        <ContentContainer className="flex flex-row flex-wrap md:flex-nowrap gap-4 lg:gap-2 items-center">
          <Avatar src={IMAGES.inboxImg} alt="pic" size="sm" className="rounded-full" />
          <ContentContainer row className="gap-1 items-center">
            <Typography variant="small" className="text-sm md:text-sm text-kiiraText font-semibold">
              With
            </Typography>
            <Typography variant="lead" className="text-sm md:text-sm text-kiiraDark font-medium">
              Dr. Candice Fraser
            </Typography>
          </ContentContainer>
        </ContentContainer>
        <Typography
          variant="small"
          className="text-sm md:text-sm text-kiiraText font-normal font-montserrat flex flex-row flex-nowrap gap-2 items-center">
          <IMAGES.LocationIcon /> <span>Virtual</span>
        </Typography>

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
